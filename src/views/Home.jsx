import { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import imgLoading from "../assets/Spinner@1x-1.0s-200px-200px.svg";
import Toastify from "toastify-js";

export default function HomePage({ url, fetchPosts }) {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  async function fetchPosts() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${url}/apis/blog/posts`, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      });
      setPosts(data.data);
      // console.log(data.data);
    } catch (error) {
      Toastify({
        text: error.response.data.error,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#EF4C54",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <>
      <div className="flex justify-center items-center pt-10"></div>
      <div>
        {loading ? (
          <>
            <div className="flex justify-center items-center h-screen">
              <img src={imgLoading} alt="" />
            </div>
          </>
        ) : (
          <main className="m-20 grid">
            <Card posts={posts} key={posts.id} url={url} fetchPosts={fetchPosts}/>
          </main>
        )}
      </div>
    </>
  );
}

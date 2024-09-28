import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Toastify from "toastify-js"
import PostsForm from "../components/PostsForm";
export default function Edit({ url }) {
  const navigate = useNavigate();
  const [posts, setPosts] = useState({});
  const { id } = useParams();
  async function handleSubmit(e, title, content, imgUrl, categoryId) {
    e.preventDefault();
    try {
      const body = { title, content, imgUrl, categoryId: +categoryId };

      const { data } = await axios.put(`${url}/apis/blog/posts/${id}`, body, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      });
      navigate("/");
      Toastify({
        text: `Succedd edit product`,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#008000",
        },
        onClick: function () {},
      }).showToast();
    } catch (error) {
      Toastify({
        text: error.response.data.error,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#FF0000",
        },
        onClick: function () {},
      }).showToast();
    }
  }
  async function fetchPosts() {
    try {
      const { data } = await axios.get(`${url}/apis/blog/posts/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      });
      setPosts(data.data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <>
      <PostsForm
        url={url}
        posts={posts}
        handleSubmit={handleSubmit}
        nameProp={"Edit Posts"}
      />
    </>
  );
}

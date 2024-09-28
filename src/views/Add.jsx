import axios from "axios";
import { useNavigate } from "react-router-dom";
import PostsForm from "../components/PostsForm";
import Toastify from "toastify-js"
export default function Add({ url }) {
  const navigate = useNavigate();
  async function handleSubmit(e, title, content, imgUrl, categoryId) {
    e.preventDefault();
    try {
      const body = { title, content, imgUrl, categoryId: +categoryId };
      console.log(body);

      const { data } = await axios.post(`${url}/apis/blog/posts`, body, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      });
      navigate("/");
      Toastify({
        text: `Succedd add posts`,
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
    }
  }
  return (
    <>
      <PostsForm
        url={url}
        handleSubmit={handleSubmit}
        nameProp={"Save Posts"}
      />
    </>
  );
}

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Toastify from "toastify-js";
export default function Card({ posts, url, fetchPosts }) {
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  async function delPost(id) {
    try {
      const { data } = await axios.delete(`${url}/apis/blog/posts/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      });
      fetchPosts();
      Toastify({
        text: `success delete data`,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#008000",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
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

  async function handleImage(id) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await axios.patch(
        `${url}/apis/blog/posts/${id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        }
      );
      fetchPosts();
      Toastify({
        text: data.message,
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
    <div className="w-full">
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-4 text-left w-1/5">Id</th>
            <th className="p-4 text-left w-1/5">Image</th>
            <th className="p-4 text-left w-1/5">Title</th>
            <th className="p-4 text-left w-2/5">Content</th>
            <th className="p-4 text-left w-1/5">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="border-b">
              <td>{post.id}</td>
              <td className="p-4">
                <img
                  src={post.imgUrl}
                  alt={post.title}
                  className="object-cover w-full h-40 rounded-lg"
                />
              </td>
              <td className="p-4 font-semibold">{post.title}</td>
              <td className="p-4 w-fit">{post.content}</td>
              <td className="p-4 flex flex-col gap-2">
                <button
                  onClick={() => delPost(post.id)}
                  className="bg-red-500 text-white py-2 rounded-lg w-full"
                >
                  Delete
                </button>
                <button
                  onClick={() => navigate(`/edit/${post.id}`)}
                  className="bg-blue-500 text-white py-2 rounded-lg w-full"
                >
                  Edit
                </button>
                <div className="flex bg-green-500 text-white rounded-lg ">
                  <input
                    type="file"
                    name="imageUrl"
                    className=""
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <i
                    className="mr-5"
                    onClick={() => handleImage(post.id)}
                  >
                    Upload
                  </i>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
export default function Login({ url }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function handleLogin(e) {
    e.preventDefault();
    try {
      let { data } = await axios.post(`${url}/apis/login`, { email, password });
      localStorage.setItem("token", data.data.access_token);
      navigate("/");
      Toastify({
        text: "Success Login",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#00B29F",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
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
      <form
        method="post"
        className="flex flex-col items-center gap-6 p-6 border rounded-lg shadow-lg max-w-sm mx-auto mt-10 bg-white"
      >
        <h2 className="text-2xl font-bold text-gray-700">Login</h2>

        <div className="w-full">
          <label htmlFor="email" className="block text-gray-600 text-sm mb-2">
            Email
          </label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            placeholder="example@mail.com"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="w-full">
          <label
            htmlFor="password"
            className="block text-gray-600 text-sm mb-2"
          >
            Password
          </label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            placeholder="•••••••"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>
      </form>
    </>
  );
}

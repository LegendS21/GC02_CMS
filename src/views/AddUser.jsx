import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js"
export default function AddUser({ url }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  async function addUser(e, username, email, password, phoneNumber, address) {
    e.preventDefault();
    const body = { username, email, password, phoneNumber, address };
    try {
      const { data } = await axios.post(`${url}/apis/add-user`, body, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      });
      navigate("/");
      Toastify({
        text: `Succedd add user`,
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
      <div className="flex justify-center m-10">
        <form
          className="max-w-sm shadow-lg p-4 rounded-lg"
          onSubmit={(e) =>
            addUser(e, username, email, password, phoneNumber, address)
          }
        >
          <div>
            <label>Username</label>
            <input
              type="text"
              className="m-2"
              placeholder="User name"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              className="m-2"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              className="m-2"
              placeholder="* * * * *"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div>
            <label>Phone Number</label>
            <input
              type="text"
              className="m-2"
              placeholder="0813 123123112"
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
            />
          </div>
          <div>
            <label>Address</label>
            <input
              type="text"
              className="m-2"
              placeholder="jl.asdasdasda123123"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
          </div>
          <div>
            <button
              className="bg-black text-white rounded-lg w-full btn btn-accent mt-10"
              type="submit"
            >
              Save User
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

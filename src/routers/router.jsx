import { createBrowserRouter, redirect } from "react-router-dom";
import Toastify from "toastify-js";
import Login from "../views/Login";
import Home from "../views/Home";
import BaseLayout from "../views/BaseLayout";
import Add from "../views/Add";
import Edit from "../views/EditPost";
import Categories from "../views/Categories";
import AddUser from "../views/AddUser";
const url = "https://h8-phase2-gc.vercel.app";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login url={url} />,
    loader: () => {
      if (localStorage.token) {
        Toastify({
          text: "You already logged in",
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
        return redirect("/");
      }
      return null;
    },
  },
  {
    element: <BaseLayout />,
    loader: () => {
      if (!localStorage.token) {
        Toastify({
          text: "Please Login First",
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
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <Home url={url} />,
      },
      { path: "/add", element: <Add url={url} /> },
      { path: "/categories", element: <Categories url={url} /> },
      { path: "/users", element: <AddUser url={url} /> },
      { path: "/edit/:id", element: <Edit url={url} /> },
    ],
  },
]);
export default router;

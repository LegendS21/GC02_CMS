import router from "./routers/router";
import { RouterProvider } from "react-router-dom";
function Home() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default Home;

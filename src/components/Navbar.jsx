import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }
  return (
    <>
      <nav className="navbar sticky top-0 z-10 p-3 bg-gray-100 shadow flex flex-auto justify-between">
        <div className="navbar-start">
          <Link className="text-2xl font-bold px-6" to="/login">
            <span className="">Login</span>
          </Link>
        </div>
        <div className="navbar-start">
          <Link className="text-2xl font-bold px-6" to="/users">
            <span>Add User</span>
          </Link>
        </div>
        <div className="navbar-start">
          <Link className="text-2xl font-bold px-6" to="/categories">
            <span>Categories</span>
          </Link>
        </div>
        <div className="navbar-start">
          <Link className="text-2xl font-bold px-6" to="/">
            <span>Home</span>
          </Link>
        </div>

        <div className="navbar-start">
          <Link className="text-2xl font-bold px-6" to="/add">
            <span>Add Posts</span>
          </Link>
        </div>
        <div className="navbar-start">
          <Link onClick={handleLogout} className="text-2xl font-bold px-6">
            <span>logout</span>
          </Link>
        </div>
      </nav>
    </>
  );
}

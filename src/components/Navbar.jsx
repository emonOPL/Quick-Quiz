import React from "react";
import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import LoginImage from "../assets/login.webp";
import LogoutImage from "../assets/logout.webp";
import { Bounce, toast } from "react-toastify";

export default function Navbar() {
  const { user, setUser, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut()
      .then(() => {
        setUser(null);
        toast.success("Successfully logged out", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      });
  };

  return (
    <div className="sticky top-0 z-9999 bg-white shadow-sm">
      <div className="navbar text-black container mx-auto p-0 justify-between">
        <div className="flex-1">
          <Link to="/">
            <div className="w-10 rounded-full">
              <img alt="logo" src="/Logo.png" />
            </div>
          </Link>
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-xl font-medium text-gray-800 flex items-center gap-1">
            Greetings,&nbsp;
            <Link
              to="/"
              className="text-blue-400 hover:underline hover:text-blue-800 transition-colors duration-200"
            >
              {user ? user.displayName : "Guest"}
            </Link>
          </p>
          {user ? (
            <div onClick={handleLogout} className="text-2xl">
              <span title="Logout">
                <img
                  src={LogoutImage}
                  alt="Logout"
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
              </span>
            </div>
          ) : (
            <Link to={"/login"} className="text-2xl">
              <span title="Login">
                <img
                  src={LoginImage}
                  alt="Login"
                  className="w-10 h-10 rounded-full"
                />
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import { Link } from "react-router";

export default function Navbar() {
  return (
    <div className="sticky top-0 z-9999">
      <div className="navbar bg-white shadow-sm text-black">
        <div className="flex-1">
          <Link to="/">
            <div className="w-10 rounded-full">
              <img alt="logo" src="/Logo.png" />
            </div>
          </Link>
        </div>
        <div className="flex gap-2 items-center">
          <Link to="/" className="text-xl hover:underline">
            User
          </Link>
          <Link to={"/login"} className="text-2xl">
            <span title="Login">
              <AiOutlineLogin />
            </span>
          </Link>
          <Link to={"/logout"} className="text-2xl">
            <span title="Logout">
              <AiOutlineLogout />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

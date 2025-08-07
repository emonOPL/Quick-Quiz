import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";

export default function Root() {
  return (
    <div className="min-h-screen bg-[#E5E5E5] text-black">
      <Navbar />
      <div className="p-5">
        <Outlet />
      </div>
    </div>
  );
}

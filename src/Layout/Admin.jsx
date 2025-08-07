import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";

export default function Admin() {
  return (
    <div>
      <Navbar />
      <div className="bg-black/30 text-white p-5 min-h-dvh">
        <Outlet />
      </div>
    </div>
  );
}

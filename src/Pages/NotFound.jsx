import React from "react";
import Navbar from "../components/Navbar";
import ErrorImage from "../assets/error.webp";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#E5E5E5] text-black">
      <Navbar />
      <div className="container mx-auto flex flex-col justify-center items-center">
        <img src={ErrorImage} alt="Not Found" />

        <h1 className="text-4xl font-bold text-[#0DA787] text-center">
          404! Page Not Found
        </h1>
      </div>
    </div>
  );
}

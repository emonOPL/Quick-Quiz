import React from "react";
import Logo from "/Logo.svg";

export default function Loading() {
  return (
    <div>
      <div className="flex justify-center items-center h-dvh z-50 fixed top-0 left-0 w-full bg-black/30">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-[#FCA311] flex justify-center items-center">
          <img alt="logo" src={Logo} className="w-12 h-12 rounded-full" />
        </div>
      </div>
    </div>
  );
}

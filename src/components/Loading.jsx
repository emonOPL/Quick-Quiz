import React from "react";

export default function Loading() {
  return (
    <div>
      <div className="flex justify-center items-center h-dvh z-50 fixed top-0 left-0 w-full bg-black/30">
        <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-[#FCA311]"></div>
      </div>
    </div>
  );
}

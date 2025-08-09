import React from "react";
import ResultImage from "../assets/result.png";

export default function Result() {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-5">
        <h1 className="text-2xl font-semibold text-center">
          Your score is <br /> 5 out of 10
        </h1>
        <img
          alt="result"
          src={ResultImage}
          className="w-2/3 h-auto object-cover mx-auto"
        />
      </div>
      <h1 className="text-4xl font-bold mb-2">Question Analysis</h1>
      <p className="mb-2 text-gray-500 font-semibold">
        You answered 5 out of 10 questions correctly
      </p>
      <hr className="border border-gray-300 mb-3" />
    </div>
  );
}

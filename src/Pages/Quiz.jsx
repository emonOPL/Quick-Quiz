import React from "react";
import Question from "../components/Question";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

export default function Quiz() {
  return (
    <>
      <div className="container mx-auto">
        <Question />
      </div>
      <div className="fixed bottom-2.5 left-1/2 transform -translate-x-1/2 container border-2 border-gray-300 rounded-lg p-2 bg-white flex justify-between items-center gap-2">
        <button className="btn bg-[#2A9D8F] border-none">
          <FaArrowLeftLong size={20} />
        </button>
        <progress
          className="progress progress-success"
          value="70"
          max="100"
        ></progress>
        <button className="btn bg-[#2A9D8F] border-none flex items-center gap-2">
          <p className="text-lg">Next Question</p>
          <FaArrowRightLong size={20} />
        </button>
      </div>
    </>
  );
}

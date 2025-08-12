import React from "react";
import ResultImage from "../assets/result.png";
import { useLocation } from "react-router";
import { ImCheckmark, ImCross } from "react-icons/im";

export default function Result() {
  const location = useLocation();
  let score = 0;

  const questions = location.state?.questions || [];

  questions.forEach((question) => {
    if (question.userAnswer === question.answer) {
      score += 1;
    }
  });

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-5">
        <h1 className="text-2xl font-semibold text-center">
          Your score is <br /> {score} out of 10
        </h1>
        <img
          alt="result"
          src={ResultImage}
          className="w-2/3 h-auto object-cover mx-auto"
        />
      </div>
      <h1 className="text-4xl font-bold mb-2">Question Analysis</h1>
      <p className="mb-2 text-gray-500 font-semibold">
        You answered {score} out of 10 questions correctly
      </p>
      <hr className="border border-gray-300 mb-3" />

      {questions.map((q) => (
        <div
          key={q.id}
          className="border border-[#FCA311] rounded-lg p-5 bg-white hover:bg-black hover:text-white transition duration-300 ease-in-out mb-3"
        >
          <div className="flex justify-between items-center">
            <h4>{q.question}</h4>
            {q.userAnswer === q.answer ? (
              <ImCheckmark size={20} className="text-green-500" />
            ) : (
              <ImCross size={18} className="text-red-500" />
            )}
          </div>
          <hr className="my-2 opacity-20 w-full" />
          <div className="flex justify-between items-center flex-wrap gap-2">
            {q.options.map((opt, i) => (
              <div key={i} className="flex items-center gap-2">
                <span
                  className={`border border-[#8D9FF6] rounded-full w-6 h-6 flex justify-center items-center ${
                    q.answer === i
                      ? "bg-green-500"
                      : q.userAnswer === i
                      ? "bg-red-500"
                      : ""
                  }
`}
                >
                  {i + 1}
                </span>
                <p>{opt}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

import React from "react";

export default function Question({ question, onAnswer }) {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-2">{question.question}</h1>
      <p className="mb-2 text-gray-500 font-semibold">
        Choose the correct answer
      </p>
      <hr className="border border-gray-300 mb-3" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {question.options.map((option, index) => (
          <label
            key={index}
            className="border border-gray-300 p-5 rounded bg-[#264653] text-white font-bold flex items-center gap-2 cursor-pointer"
          >
            <input
              type="radio"
              name={question.id}
              value={index}
              checked={question.userAnswer === index}
              onChange={() => onAnswer(question.id, index)}
              className="radio bg-blue-100 border-blue-300 checked:bg-blue-200 checked:text-blue-600 checked:border-blue-600"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

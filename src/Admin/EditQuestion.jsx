import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { db } from "../firebase/firebase.config";

export default function EditQuestion() {
  const { categoryId, questionId } = useParams();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestion = async () => {
      const docRef = doc(db, "categories", categoryId, "questions", questionId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setQuestion(data.question);
        setOptions(data.options);
        setAnswer(data.answer);
      }
    };
    fetchQuestion();
  }, [categoryId, questionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "categories", categoryId, "questions", questionId);
    await updateDoc(docRef, {
      question,
      options,
      answer: parseInt(answer) - 1,
    });
    navigate("/admin/questions/" + categoryId);
  };

  return (
    <div className="container mx-auto">
      <div className="w-1/2 mx-auto bg-[#14213D] rounded-xl p-5 border border-white">
        <h1 className="text-2xl font-semibold mb-5 text-[#FCA311] text-center">
          Edit Question
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-4 gap-4 items-center">
            <label className="lg:text-lg lg:text-right col-span-4 lg:col-span-1">
              Question:
            </label>
            <input
              placeholder="Question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="col-span-4 lg:col-span-3 border border-[#FCA311] rounded-md p-2 validator"
              type="text"
              pattern=".*\S.*"
              title="Name is required"
              required
            />
            <span className="hidden lg:block"></span>
            <p className="validator-hint col-span-4 lg:col-span-3">
              Question must not be empty
            </p>
          </div>
          {options.map((opt, i) => (
            <div className="grid grid-cols-4 gap-4 items-center">
              <label className="lg:text-lg lg:text-right col-span-4 lg:col-span-1">
                Option-{i + 1}:
              </label>
              <input
                key={i}
                placeholder={`Option ${i + 1}`}
                value={opt}
                onChange={(e) => {
                  const newOptions = [...options];
                  newOptions[i] = e.target.value;
                  setOptions(newOptions);
                }}
                className="col-span-4 lg:col-span-3 border border-[#FCA311] rounded-md p-2 validator"
                type="text"
                pattern=".*\S.*"
                title="This option is required"
                required
              />
              <span className="hidden lg:block"></span>
              <p className="validator-hint col-span-4 lg:col-span-3">
                Option-{i + 1} must not be empty
              </p>
            </div>
          ))}
          <div className="grid grid-cols-4 gap-4 items-center">
            <label className="lg:text-lg lg:text-right col-span-4 lg:col-span-1">
              Answer:
            </label>
            <input
              className="col-span-4 lg:col-span-3 border border-[#FCA311] rounded-md p-2 validator"
              placeholder="Correct Option (1-4)"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              type="number"
              min="1"
              max="4"
              pattern="^[1-4]$"
              title="Enter a number between 1 and 4"
              required
            />
            <span className="hidden lg:block"></span>
            <p className="validator-hint col-span-4 lg:col-span-3">
              Enter a number between 1 and 4
            </p>
          </div>
          <div className="flex justify-center sm:justify-evenly items-center gap-4 flex-wrap">
            <button
              type="submit"
              className="bg-[#FCA311] text-white py-2 px-4 rounded-md text-lg border border-[#FCA311] hover:bg-black hover:text-[#FCA311] cursor-pointer"
            >
              Update
            </button>
            <Link
              to={"/admin/questions/" + categoryId}
              className="bg-[#E5E5E5] text-black py-2 px-4 rounded-md text-lg border border-[#E5E5E5] hover:bg-black hover:text-[#E5E5E5] cursor-pointer"
            >
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

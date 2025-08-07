import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { db } from "../firebase/firebase.config";
import Loading from "../components/Loading";

export default function QuestionsList() {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();
  const categoryId = id;

  useEffect(() => {
    const fetchCategory = async () => {
      const categoryRef = doc(db, "categories", categoryId);
      const categorySnap = await getDoc(categoryRef);
      if (categorySnap.exists()) {
        setCategoryName(categorySnap.data().name);
      } else {
        setCategoryName("Unknown Category");
      }
    };

    const fetchData = async () => {
      const snapshot = await getDocs(
        collection(db, "categories", categoryId, "questions")
      );
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setQuestions(data);
      setLoading(false);
    };
    fetchCategory();
    fetchData();
  }, [categoryId]);

  const deleteQuestion = async (id) => {
    await deleteDoc(doc(db, "categories", categoryId, "questions", id));
    setQuestions(questions.filter((question) => question.id !== id));
  };

  console.log(questions);

  return (
    <div className="container mx-auto">
      {showModal && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full border border-[#FCA311]">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Confirm Deletion
            </h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this question?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded cursor-pointer"
              >
                No
              </button>
              <button
                onClick={async () => {
                  deleteQuestion(deleteId);
                  setShowModal(false);
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded cursor-pointer"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold text-[#FCA311]">{categoryName}</h2>
        <button
          onClick={() => navigate(`/admin/add-question/${categoryId}`)}
          className="bg-[#FCA311] text-white py-2 px-4 rounded-md text-lg border border-[#FCA311] hover:bg-black hover:text-[#FCA311] cursor-pointer"
        >
          Add Question
        </button>
      </div>

      {loading && <Loading />}

      <div className="grid gap-5">
        {questions.map((q) => (
          <div
            key={q.id}
            className="border border-[#FCA311] rounded-lg p-5 bg-[#14213D] hover:bg-black"
          >
            <div className="flex justify-between items-center">
              <h4>{q.question}</h4>
              <div className="space-x-2 lg:space-x-4">
                <button
                  onClick={() =>
                    navigate(`/admin/edit-question/${categoryId}/${q.id}`)
                  }
                  className="cursor-pointer text-xl"
                >
                  ✏️
                </button>
                <button
                  onClick={() => {
                    setDeleteId(q.id);
                    setShowModal(true);
                  }}
                  className="cursor-pointer text-xl"
                >
                  🗑️
                </button>
              </div>
            </div>
            <hr className="my-2 opacity-20 w-full" />
            <div className="flex justify-between items-center flex-wrap gap-2">
              {q.options.map((opt, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span
                    className={`border border-white rounded-full w-6 h-6 flex justify-center items-center ${
                      q.answer === i ? "bg-green-500" : ""
                    }`}
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
    </div>
  );
}

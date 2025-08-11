import React, { useEffect, useState } from "react";
import Question from "../components/Question";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useParams } from "react-router";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import Loading from "../components/Loading";

export default function Quiz() {
  const { categoryId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(null);

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

    function getRandomItems(array, count) {
      const copy = [...array];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy.slice(0, count);
    }

    const fetchData = async () => {
      const snapshot = await getDocs(
        collection(db, "categories", categoryId, "questions")
      );

      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      const selected = getRandomItems(data, 10);

      setQuestions(selected);
      setLoading(false);
    };

    fetchCategory();
    fetchData();
  }, [categoryId]);

  useEffect(() => {
    setQuestion(questions[index]);
  }, [index, questions]);

  return (
    <>
      <div className="container mx-auto">
        {loading ? (
          <Loading />
        ) : (
          <h1 className="text-5xl font-bold mb-4 text-[#2A9D8F]">
            {categoryName}
          </h1>
        )}
        {question && <Question question={question} index={index} />}
      </div>
      <div className="fixed bottom-2.5 left-1/2 transform -translate-x-1/2 container border-2 border-gray-300 rounded-lg p-2 bg-white flex justify-between items-center gap-2">
        <button
          className="btn bg-[#2A9D8F] border-none"
          disabled={!index}
          onClick={() => setIndex(Math.max(index - 1, 0))}
        >
          <FaArrowLeftLong size={20} />
        </button>
        <progress
          className="progress progress-success"
          value={(index + 1) * 10}
          max="100"
        ></progress>
        <button
          className="btn bg-[#2A9D8F] border-none flex items-center gap-2"
          onClick={() => setIndex(Math.min(index + 1, 9))}
        >
          <p className="text-lg">{index === 9 ? "Submit" : "Next Question"}</p>
          <FaArrowRightLong
            size={20}
            className={`${index === 9 ? "hidden" : ""}`}
          />
        </button>
      </div>
    </>
  );
}

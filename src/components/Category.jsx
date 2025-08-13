import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase.config";

export default function Category({ cat }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchScore = async () => {
      if (!user) return;

      const resultRef = collection(db, "results", user.uid, cat.id);
      const snapshot = await getDocs(resultRef);

      if (!snapshot.empty) {
        // Assuming only one result document per category
        const docData = snapshot.docs[0].data();

        if (docData.questions && Array.isArray(docData.questions)) {
          let calculatedScore = docData.questions.reduce(
            (score, q) => (q.userAnswer === q.answer ? score + 1 : score),
            0
          );
          setScore(calculatedScore);
        } else {
          setScore(null);
        }
      } else {
        setScore(null); // no quiz taken yet
      }
    };

    fetchScore();
  }, [user, cat.id]);

  return (
    <div>
      <div
        key={cat.id}
        className="border border-[#14213D] rounded-lg p-5 bg-white hover:bg-[#14213D] hover:text-white hover:border-white flex flex-col justify-between items-center"
      >
        <div
          onClick={() => navigate(`/quiz/${cat.id}`)}
          className="cursor-pointer"
        >
          <h3 className="text-lg font-bold text-center mb-2">{cat.name}</h3>
          <img
            src={cat.imgUrl}
            alt={cat.name}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        </div>
        <div className="w-full flex justify-between items-center gap-2">
          <p className="font-semibold opacity-50">10 Questions</p>
          <p className="font-semibold opacity-50">
            {score !== null ? `Score: ${score}/10` : "Score: Not taken yet"}
          </p>
        </div>
      </div>
    </div>
  );
}

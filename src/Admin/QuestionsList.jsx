import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { db } from "../firebase/firebase.config";

export default function QuestionsList() {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const categoryId = id;

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(
        collection(db, "categories", categoryId, "questions")
      );
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setQuestions(data);
    };
    fetchData();
  }, [categoryId]);

  const deleteQuestion = async (id) => {
    await deleteDoc(doc(db, "categories", categoryId, "questions", id));
    setQuestions(questions.filter((question) => question.id !== id));
  };

  return (
    <div>
      <button onClick={() => navigate(`/admin/add-question/${categoryId}`)}>
        Add Question
      </button>
      {questions.map((q) => (
        <div key={q.id}>
          <h4>{q.question}</h4>
          <button
            onClick={() =>
              navigate(`/admin/edit-question/${categoryId}/${q.id}`)
            }
          >
            ✏️
          </button>
          <button onClick={() => deleteQuestion(q.id)}>🗑️</button>
        </div>
      ))}
    </div>
  );
}

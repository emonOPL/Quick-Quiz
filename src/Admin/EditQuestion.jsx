import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
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
    await updateDoc(docRef, { question, options, answer: parseInt(answer) });
    navigate("/admin/questions/" + categoryId);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Edit Question</h2>
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Question"
        />
        {options.map((opt, i) => (
          <input
            key={i}
            value={opt}
            onChange={(e) => {
              const newOptions = [...options];
              newOptions[i] = e.target.value;
              setOptions(newOptions);
            }}
            placeholder={`Option ${i + 1}`}
          />
        ))}
        <input
          type="number"
          min="0"
          max="3"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Correct Option Index (0-3)"
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

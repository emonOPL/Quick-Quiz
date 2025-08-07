import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { db } from "../firebase/firebase.config";

export default function AddQuestion() {
  const { id } = useParams();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState("");
  const navigation = useNavigate();
  const categoryId = id;

  const handleSubmit = (e) => {
    e.preventDefault();
    addDoc(collection(db, "categories", categoryId, "questions"), {
      question,
      options,
      answer: parseInt(answer),
    });
    navigation("/admin/questions/" + categoryId);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        {options.map((opt, i) => (
          <input
            key={i}
            placeholder={`Option ${i + 1}`}
            value={opt}
            onChange={(e) => {
              const newOptions = [...options];
              newOptions[i] = e.target.value;
              setOptions(newOptions);
            }}
          />
        ))}
        <input
          placeholder="Correct Option Index (0-3)"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          type="number"
          min="0"
          max="3"
        />
        <button type="submit">Add Question</button>
      </form>
    </div>
  );
}

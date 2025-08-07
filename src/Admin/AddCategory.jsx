import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { db } from "../firebase/firebase.config";

export default function AddCategory() {
  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addDoc(collection(db, "categories"), { name, imgUrl });
    navigate("/admin");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Image URL"
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

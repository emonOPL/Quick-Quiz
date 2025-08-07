import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { db } from "../firebase/firebase.config";

export default function EditCategory() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const navigate = useNavigate();
  const categoryId = id;

  useEffect(() => {
    const fetchCategory = async () => {
      const docRef = doc(db, "categories", categoryId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setName(data.name);
        setImgUrl(data.imgUrl);
      }
    };
    fetchCategory();
  }, [categoryId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "categories", categoryId);
    await updateDoc(docRef, { name, imgUrl });
    navigate("/admin");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Edit Category</h2>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category Name"
        />
        <input
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
          placeholder="Image URL"
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

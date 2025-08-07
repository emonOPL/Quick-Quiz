import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { db } from "../firebase/firebase.config";
import { Link } from "react-router";

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
    <div className="container mx-auto">
      <div className="w-1/2 mx-auto bg-[#14213D] rounded-xl p-5 border border-white">
        <h1 className="text-2xl font-semibold mb-5 text-[#FCA311] text-center">
          Edit Category
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-4 gap-4 items-center">
            <label className="lg:text-lg lg:text-right col-span-4 lg:col-span-1">
              Category Name:
            </label>
            <input
              placeholder="Category Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-4 lg:col-span-3 border border-[#FCA311] rounded-md p-2 validator"
              type="text"
              pattern=".*\S.*"
              title="Name is required"
              required
            />
            <span className="hidden lg:block"></span>
            <p className="validator-hint col-span-4 lg:col-span-3">
              Category Name must not be empty
            </p>
          </div>
          <div className="grid grid-cols-4 gap-4 items-center">
            <label className="lg:text-lg lg:text-right col-span-4 lg:col-span-1">
              Image URL:
            </label>
            <input
              placeholder="Image URL"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              className="col-span-4 lg:col-span-3 border border-[#FCA311] rounded-md p-2 validator"
              type="url"
              required
              pattern="^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9-].*[a-zA-Z0-9])?.)+[a-zA-Z].*$"
              title="Must be valid URL"
            />
            <span className="hidden lg:block"></span>
            <p className="validator-hint col-span-4 lg:col-span-3">
              Enter a valid image URL
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
              to={"/admin"}
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

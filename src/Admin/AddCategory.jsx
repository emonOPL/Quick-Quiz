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
    if (name === "" || imgUrl === "") {
      return;
    }
    addDoc(collection(db, "categories"), { name, imgUrl });
    navigate("/admin");
  };

  return (
    <div className="container mx-auto">
      <div className="w-1/2 mx-auto bg-[#14213D] rounded-xl p-5 border border-white">
        <h1 className="text-2xl font-semibold mb-5 text-[#FCA311] text-center">
          Add Category
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
          <button
            type="submit"
            className="bg-[#FCA311] text-white py-2 px-4 rounded-md text-lg border border-[#FCA311] hover:bg-black hover:text-[#FCA311] cursor-pointer w-full md:w-1/3 lg:w-1/5 mx-auto"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

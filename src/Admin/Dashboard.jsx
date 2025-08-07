import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { db } from "../firebase/firebase.config";
import Loading from "../components/Loading";

export default function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "categories"));
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const filteredCategories = list.filter((category) =>
        category.name.toLowerCase().includes(searchQuery)
      );
      setCategories(filteredCategories);
      setLoading(false);
    };
    fetchData();
  }, [searchQuery]);

  const deleteCategory = async (id) => {
    await deleteDoc(doc(db, "categories", id));
    setCategories(categories.filter((category) => category.id !== id));
  };

  return (
    <div className="container mx-auto">
      {showModal && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full border border-[#FCA311]">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Confirm Deletion
            </h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this category?
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
                  deleteCategory(deleteId);
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

      <div className="text-center mb-5">
        <label className="input border border-[#FCA311]">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            placeholder="Search"
            onKeyUp={(e) => setSearchQuery(e.target.value)}
          />
        </label>
      </div>

      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold text-[#FCA311]">Categories</h2>
        <button
          className="bg-[#FCA311] text-white py-2 px-4 rounded-md text-lg border border-[#FCA311] hover:bg-black hover:text-[#FCA311] cursor-pointer"
          onClick={() => navigate("/admin/add-category")}
        >
          Add Category
        </button>
      </div>

      {loading && <Loading />}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="border border-[#FCA311] rounded-lg p-5 bg-[#14213D] hover:bg-black flex flex-col justify-between items-center"
          >
            <div
              onClick={() => navigate(`/admin/questions/${cat.id}`)}
              className="cursor-pointer"
            >
              <h3 className="text-lg font-bold text-center mb-2">{cat.name}</h3>
              <img
                src={cat.imgUrl}
                alt={cat.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            </div>
            <div className="w-full flex justify-evenly items-center">
              <button
                onClick={() => navigate(`/admin/edit-category/${cat.id}`)}
                className="cursor-pointer text-xl"
              >
                ✏️
              </button>
              <button
                onClick={() => {
                  setDeleteId(cat.id);
                  setShowModal(true);
                }}
                className="cursor-pointer text-xl"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

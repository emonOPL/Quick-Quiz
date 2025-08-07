import { collection, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { db } from "../firebase/firebase.config";
import Loading from "../components/Loading";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
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

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold mb-5 text-[#14213D] text-center">
        Test Your Dev Power: The Ultimate Skill Check for Front-End, Back-End &
        Full-Stack Engineers
      </h1>

      <div className="text-right mb-5">
        <label className="input border border-[#14213D] bg-white">
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

      {loading && <Loading />}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="border border-[#14213D] rounded-lg p-5 bg-white hover:bg-[#14213D] hover:text-white hover:border-white flex flex-col justify-between items-center"
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
          </div>
        ))}
      </div>
    </div>
  );
}

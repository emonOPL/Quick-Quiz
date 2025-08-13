import { collection, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase.config";
import Loading from "../components/Loading";
import Category from "../components/Category";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {categories.map((cat) => (
          <Category key={cat.id} cat={cat} />
        ))}
      </div>
    </div>
  );
}

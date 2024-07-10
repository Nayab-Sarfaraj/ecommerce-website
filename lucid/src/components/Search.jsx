import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Search = () => {
  const navigate = useNavigate();
 
  const [keyword, setKeyword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };
  return (
    <div className="flex h-screen items-center justify-center bg-[azure]">
      <form
        className="flex items-center justify-center md:px-0 px-2"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Search"
          className="text-xl px-5 py-2 shadow-2xl md:w-96 w-52 outline-none"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button
          className="text-xl px-5 py-2 bg-[#256cdf] text-white shadow-2xl hover:bg-black hover:text-[#256cdf] transition-all duration-500"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;

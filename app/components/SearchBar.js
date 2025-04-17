"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowUp } from "react-icons/fa";
import Link from "next/link";

const SearchBar = () => {
  const [query, setQuery] = useState(""); // State to hold the search query
  const router = useRouter(); // Router instance for navigation

  const handleSearch = () => {
    if (query.trim()) {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        // Redirect to the chat page if token exists
        router.push(`/chat?searchQuery=${encodeURIComponent(query)}`);
      } else {
        // Redirect to the auth page if token does not exist
        router.push("/login");
      }
    }
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents form submission if inside a form
      handleSearch();
    }
  };

  return (
    <div className="mb-6">
      {/* Wrapper for the search bar and textarea */}
      <div className="rounded-lg lg:p-4">
        {/* Textarea for the user's query */}
        <textarea
          className="w-full p-4 border-none text-lg resize-none rounded-t-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
          rows="4"
          placeholder="How can I help you today?"
          onKeyDown={onKeyPress} // Handling Enter key press
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        ></textarea>

        {/* Button to trigger the search */}

        <Link href={"/chat"}>
          <button
            onClick={handleSearch}
            className="w-full border-gray-700 bg-secondary-dark text-white py-2 flex gap-3 justify-center items-center rounded-b-lg hover:bg-gray-600 transition duration-200"
          >
            Click
            <FaArrowUp />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SearchBar;

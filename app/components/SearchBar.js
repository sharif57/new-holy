// 'use client'

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { FaArrowUp } from "react-icons/fa";

// const SearchBar = () => {
//   const [query, setQuery] = useState(""); // State to hold the search query
//   const router = useRouter(); // Router instance for navigation

//   const handleSearch = () => {
//     if (query.trim()) {
//       // Navigate to the main-message page with the search query as a URL parameter
//     //   router.push(`/main-message?searchQuery=${encodeURIComponent(query)}`);
//       router.push(`/auth`);
//     }
//   };

//   return (
//     <div className="mb-6">
//       {/* Wrapper for the search bar and textarea */}
//       <div className="rounded-lg p-4">
//         {/* Textarea for the user's query */}
//         <textarea
//           className="w-full p-4 border-none text-lg resize-none rounded-t-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
//           rows="4"
//           placeholder="How can I help you today?"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         ></textarea>

//         {/* Button to trigger the search */}
//         <button
//           onClick={handleSearch}
//           className="w-full border-gray-700 bg-secondary-dark text-white py-2 flex gap-3 justify-center items-center rounded-b-lg hover:bg-gray-600 transition duration-200"
//         >
//           Click
//           <FaArrowUp />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SearchBar;


'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowUp } from "react-icons/fa";

const SearchBar = () => {
  const [query, setQuery] = useState(""); // State to hold the search query
  const router = useRouter(); // Router instance for navigation

  const handleSearch = () => {
    if (query.trim()) {
      const accessToken = localStorage.getItem('accessToken'); // Retrieve accessToken from localStorage
      if (accessToken) {
        // Redirect to the chat page if token exists
        router.push(`/chat?searchQuery=${encodeURIComponent(query)}`);
      } else {
        // Redirect to the auth page if token does not exist
        router.push(`/login`);
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
        <button
          onClick={handleSearch}
          className="w-full border-gray-700 bg-secondary-dark text-white py-2 flex gap-3 justify-center items-center rounded-b-lg hover:bg-gray-600 transition duration-200"
        >
          Click
          <FaArrowUp />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;

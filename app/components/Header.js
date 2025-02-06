"use client";

import { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const Header = () => {
  const [theme, setTheme] = useState("light");

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  // Set theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  return (
    <header className="p-4 flex justify-end">
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-all hover:bg-gray-300 dark:hover:bg-gray-700"
        aria-label="Toggle Dark Mode"
      >
        {theme === "light" ? (
          <MdDarkMode size={24} />
        ) : (
          <MdLightMode size={24} />
        )}
      </button>
    </header>
  );
};

export default Header;

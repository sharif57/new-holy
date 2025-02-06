/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', 
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#f6f4ef",
          light: "#60A5FA", 
          dark: "#1E40AF",
        },
        secondary: {
          DEFAULT: "#F97316",
          light: "#f6f4ef",
          dark: "#252523",
        },
      },
    },
  },
  plugins: [],
};

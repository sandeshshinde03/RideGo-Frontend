// Frontend/src/pages/Start.jsx
import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div className="w-full h-screen flex items-center">
      {/* Left panel: content */}
      <div className="relative w-full sm:min-w-[350px] sm:w-[400px] h-full bg-white overflow-hidden flex flex-col justify-between bg-cover bg-center"
           style={{ backgroundImage: "url('/GoRide-Mobile.png')" }}>
        
        {/* Logo */}
        <img src="/logo.png" alt="Logo" className="h-12 object-contain m-4 self-start" />

        {/* Bottom content */}
        <div className="flex flex-col bg-white p-6 gap-6 rounded-t-lg">
          <h1 className="text-2xl sm:text-3xl font-semibold">Get Started with GoRide</h1>
          <Link
            to="/login"
            className="flex justify-center items-center gap-2 py-3 font-semibold bg-black text-white w-full rounded-lg hover:bg-gray-800 transition duration-300"
          >
            Continue
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-right"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      </div>

      {/* Right panel: side image for large screens */}
      <div className="hidden sm:block w-full h-full bg-[#eae1fe] overflow-hidden select-none border-l-2 border-black">
        <img
          className="h-full object-cover mx-auto select-none"
          src="/GoRide-Laptop.png"
          alt="Side image"
        />
      </div>
    </div>
  );
};

export default Start;
 
import React from "react";
import { useNavigate } from "react-router-dom";
import illHome from "../assets/illHome.png";

const HeaderLanding = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8 relative min-h-screen">
      {/* Main content wrapper with relative positioning */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8">
        {/* Text content - now with positioning options */}
        <div className="lg:absolute lg:left-20 lg:top-32 z-10 text-center lg:text-left max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-poppins leading-tight mb-8">
            Manage College Clubs <br className="hidden lg:block" />
            and Events <br className="hidden lg:block" />
            at one place
          </h1>

          <button
            type="button"
            onClick={() => navigate("/sign-up")}
            className="text-black bg-sky-100 hover:bg-sky-200 focus:outline-none focus:ring-4 
                     focus:ring-blue-300 rounded-full text-xl md:text-2xl px-6 py-3 
                     font-bold transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            Sign Up
          </button>
        </div>

        {/* Image - can be positioned relative to the container */}
        <div className="lg:absolute lg:right-0 lg:top-16 lg:w-1/2">
          <img
            src={illHome}
            alt="College clubs illustration"
            className="w-full max-w-lg mx-auto lg:max-w-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderLanding;

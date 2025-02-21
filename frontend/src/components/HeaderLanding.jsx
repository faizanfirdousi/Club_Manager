import React from "react";
import { useNavigate } from "react-router-dom";
import illHome from "../assets/illHome.png";

const HeaderLanding = () => {
  const navigate = useNavigate();

  return (
    <main className="relative w-full min-h-screen overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative min-h-screen">
        <div className="w-full flex flex-col lg:flex-row items-center justify-center min-h-screen gap-8 lg:gap-16 py-20 lg:py-32">
          {/* Left content section */}
          <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6 lg:space-y-8 pt-16 lg:pt-0">
            <div className="space-y-4 lg:space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-white">
                Manage College
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  Clubs{" "}
                </span>
                and
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  {" "}
                  Events
                </span>
              </h1>

              <p className="text-gray-300 text-lg sm:text-xl lg:text-2xl font-light max-w-2xl mx-auto lg:mx-0">
                One platform for all your college activities and event
                management needs. Simple, powerful, and designed for students.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => navigate("/sign-up")}
                className="group px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full 
                         bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:shadow-lg 
                         hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300"
              >
                Get Started
                <span className="inline-block ml-2 transform group-hover:translate-x-1 transition-transform duration-200">
                  →
                </span>
              </button>
              <button
                onClick={() => navigate("/about")}
                className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full 
                         border-2 border-white/30 text-white hover:bg-white/10 transform 
                         hover:scale-105 transition-all duration-300 hover:border-white/50"
              >
                Learn More
              </button>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-8">
              {[
                { number: "500+", label: "Active Users" },
                { number: "50+", label: "College Clubs" },
                { number: "100+", label: "Events Managed" },
              ].map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div
                    className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text 
                               bg-gradient-to-r from-purple-400 to-pink-400"
                  >
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-xs sm:text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right illustration section */}
          <div className="w-full lg:w-1/2 px-4 sm:px-0">
            <img
              src={illHome}
              alt="College clubs illustration"
              className="w-full max-w-xl mx-auto drop-shadow-2xl transform hover:scale-105 
                       transition-transform duration-500"
            />
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div
        className="absolute top-1/4 left-0 w-72 h-72 bg-purple-500 rounded-full 
                    mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
      ></div>
      <div
        className="absolute top-1/4 right-0 w-72 h-72 bg-cyan-500 rounded-full 
                    mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"
      ></div>
      <div
        className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-pink-500 rounded-full 
                    mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"
      ></div>
    </main>
  );
};

export default HeaderLanding;

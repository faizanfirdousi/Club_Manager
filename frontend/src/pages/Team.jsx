import React from "react";
import Navbar from "../components/Navbar";
import faizan from "../assets/faizan.jpg";
import sarthak from "../assets/sarthak.jpeg";

function Team() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <Navbar />

      <div className="container mx-auto px-6 pt-32 pb-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Meet Our
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              {" "}
              Team
            </span>
          </h1>
          <p className="text-gray-300 text-lg">
            Dedicated developers working together to revolutionize college club
            management.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            {
              name: "Faizan Firdousi",
              role: "Software Developer",
              image: faizan,
              bio: "Coding since the day he was born",
            },
            {
              name: "Sarthak Hingankar",
              role: "Software Developer",
              image: sarthak,
              bio: "Coding since before he was born",
            },
          ].map((member, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-40 h-40 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-white mb-2">
                {member.name}
              </h3>
              <p className="text-purple-400 mb-3">{member.role}</p>
              <p className="text-gray-300">{member.bio}</p>
            </div>
          ))}
        </div>

        {/* Join Team Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Join Our Team</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals who are passionate
            about improving the college experience through technology.
          </p>
          <button
            className="px-8 py-3 text-base font-semibold rounded-full bg-gradient-to-r 
                         from-purple-500 to-indigo-600 text-white hover:shadow-lg 
                         hover:shadow-purple-500/50 transform hover:scale-105 
                         transition-all duration-300"
          >
            View Open Positions
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
    </div>
  );
}

export default Team;

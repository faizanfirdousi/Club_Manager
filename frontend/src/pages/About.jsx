import React from "react";
import Navbar from "../components/Navbar";

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <Navbar />

      <div className="container mx-auto px-6 pt-32 pb-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              {" "}
              Kaizen
            </span>
          </h1>
          <p className="text-gray-300 text-lg mb-8">
            Streamlining college club management and event organization for a
            better campus experience.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Our Mission</h2>
            <p className="text-gray-300">
              To create a unified platform that enhances student engagement
              through seamless club management and event organization, making
              campus life more vibrant and accessible for everyone.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-center">
                <svg
                  className="w-6 h-6 mr-2 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Simplify club management
              </li>
              <li className="flex items-center">
                <svg
                  className="w-6 h-6 mr-2 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Streamline event organization
              </li>
              <li className="flex items-center">
                <svg
                  className="w-6 h-6 mr-2 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Foster student engagement
              </li>
            </ul>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            {
              title: "Innovation",
              description:
                "Continuously improving and adapting to meet student needs",
              icon: "🚀",
            },
            {
              title: "Community",
              description: "Building stronger connections within campus life",
              icon: "🤝",
            },
            {
              title: "Accessibility",
              description:
                "Making club participation easy and inclusive for all",
              icon: "🎯",
            },
          ].map((value, index) => (
            <div
              key={index}
              className="p-6 bg-white/10 backdrop-blur-md rounded-2xl text-center"
            >
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {value.title}
              </h3>
              <p className="text-gray-300">{value.description}</p>
            </div>
          ))}
        </div>

        {/* Vision Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Our Vision</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            To revolutionize how college clubs operate by providing cutting-edge
            tools and features that make management effortless and participation
            engaging. We envision a future where every student can easily
            connect with their interests and passions through campus activities.
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
    </div>
  );
}

export default About;

import React from "react";

function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Create Your Club",
      description:
        "Set up your club profile with all necessary details and requirements.",
    },
    {
      number: "02",
      title: "Add Members",
      description:
        "Invite and manage club members through an intuitive interface.",
    },
    {
      number: "03",
      title: "Plan Events",
      description:
        "Organize and schedule events with comprehensive planning tools.",
    },
    {
      number: "04",
      title: "Track Progress",
      description:
        "Monitor participation and engagement through detailed analytics.",
    },
  ];

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How It
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              {" "}
              Works
            </span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Get started with your club management in four simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative p-6 bg-white/10 backdrop-blur-md rounded-2xl 
                       hover:bg-white/20 transition-all duration-300"
            >
              <div
                className="text-5xl font-bold text-transparent bg-clip-text 
                           bg-gradient-to-r from-purple-400 to-pink-400 mb-4"
              >
                {step.number}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-gray-300">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div
        className="absolute top-1/2 left-0 w-72 h-72 bg-purple-500 rounded-full 
                    mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
      ></div>
      <div
        className="absolute top-1/2 right-0 w-72 h-72 bg-pink-500 rounded-full 
                    mix-blend-multiply filter blur-3xl opacity-20 animate-blob 
                    animation-delay-2000"
      ></div>
    </section>
  );
}

export default HowItWorks;

import React from "react";
import Navbar from "../components/Navbar";
import HeaderLanding from "../components/HeaderLanding";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
// import Stats from "../components/Stats";
// import Testimonials from "../components/Testimonials";

function Landing() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 overflow-x-hidden">
      <div className="relative w-full min-h-screen">
        <Navbar />
        <HeaderLanding />
      </div>
      <Features />
      <HowItWorks />
      {/* <Stats />
      <Testimonials /> */}
    </div>
  );
}

export default Landing;

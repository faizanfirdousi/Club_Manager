import React from "react";
import Navbar from "../components/Navbar";
import HeaderLanding from "../components/HeaderLanding";

function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <Navbar />
      <HeaderLanding />
    </div>
  );
}

export default Landing;

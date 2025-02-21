import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Update the navigation items array to match exact routes from App.jsx
  const navigationItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Team", path: "/team" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen
          ? "bg-gray-900/95 backdrop-blur-sm shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span
            className="self-center text-2xl md:text-3xl font-bold whitespace-nowrap text-transparent 
                         bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
          >
            Kaizen
          </span>
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white 
                   rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 
                   focus:ring-purple-500"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Navigation menu */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul
            className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:items-center 
                       md:space-x-8 md:mt-0 md:border-0"
          >
            {navigationItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-2 px-3 md:p-0 text-white hover:text-transparent 
                           hover:bg-clip-text hover:bg-gradient-to-r from-purple-400 to-pink-400 
                           transition-all duration-300 ${
                             location.pathname === item.path
                               ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
                               : ""
                           }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={() => {
                  navigate("/login");
                  setIsMenuOpen(false);
                }}
                className="w-full md:w-auto px-6 py-2 text-sm font-semibold rounded-full 
                         bg-gradient-to-r from-purple-500 to-indigo-600 text-white 
                         hover:shadow-lg hover:shadow-purple-500/50 transform 
                         hover:scale-105 transition-all duration-300"
              >
                Login
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

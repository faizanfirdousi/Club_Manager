import React from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { auth } from "../components/firebase";
import Clubs from "./dashboardComponents/Clubs";
import Events from "./dashboardComponents/Events";
import Calendar from "./dashboardComponents/Calendar";
import Profile from "./dashboardComponents/Profile";
import Chat from "./dashboardComponents/Chat";
import ClubDetails from "./dashboardComponents/ClubDetails";
import Home from "./dashboardComponents/Home";
import NotificationBell from "../components/NotificationBell";
import ClubsPage from "./dashboardComponents/ClubsPage";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const getToken = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken();
        console.log("Your Firebase Token:", token);
      } else {
        console.log("No user is signed in");
      }
    } catch (error) {
      console.error("Error getting token:", error);
    }
  };

  const activeClassName = "bg-purple-700 text-white";
  const inactiveClassName = "text-gray-600 hover:bg-purple-50";
  const baseClassName =
    "flex items-center px-4 py-2 rounded-md transition-colors duration-200";

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md flex flex-col">
        <nav className="flex-1 px-2 py-4 space-y-2">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `${baseClassName} ${
                isActive ? activeClassName : inactiveClassName
              }`
            }
          >
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Home
          </NavLink>

          <NavLink
            to="/dashboard/clubs"
            className={({ isActive }) =>
              `${baseClassName} ${
                isActive ? activeClassName : inactiveClassName
              }`
            }
          >
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Clubs
          </NavLink>

          <NavLink
            to="/dashboard/events"
            className={({ isActive }) =>
              `${baseClassName} ${
                isActive ? activeClassName : inactiveClassName
              }`
            }
          >
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Events
          </NavLink>

          <NavLink
            to="/dashboard/calendar"
            className={({ isActive }) =>
              `${baseClassName} ${
                isActive ? activeClassName : inactiveClassName
              }`
            }
          >
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zm0 0H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z M16 2v4 M8 2v4 M3 10h18"
              />
            </svg>
            Calendar
          </NavLink>

          <NavLink
            to="/dashboard/chat"
            className={({ isActive }) =>
              `${baseClassName} ${
                isActive ? activeClassName : inactiveClassName
              }`
            }
          >
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            Chat
          </NavLink>

          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `${baseClassName} ${
                isActive ? activeClassName : inactiveClassName
              }`
            }
          >
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Profile
          </NavLink>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-gray-600 hover:bg-red-50 hover:text-red-700 rounded-md transition-colors duration-200"
          >
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </button>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                {/* You can add breadcrumbs or other navigation here */}
              </div>
              <div className="flex items-center">
                <NotificationBell />
                {/* Add other header items here if needed */}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="clubs" element={<ClubsPage />} />
            <Route path="clubs/:clubId" element={<ClubDetails />} />
            <Route path="events" element={<Events />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="chat" element={<Chat />} />
            <Route path="profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

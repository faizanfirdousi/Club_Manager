import React, { useState, useEffect } from "react";
import { auth } from "../../components/firebase";

function Home() {
  const [stats, setStats] = useState({
    clubsCount: 0,
    eventsCount: 0,
    notificationsCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.log("No user found");
        return;
      }

      const token = await user.getIdToken();
      console.log("Token obtained, length:", token.length);

      const response = await fetch("http://localhost:3001/api/user/stats", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Stats data:", data);
      setStats(data);
    } catch (error) {
      console.error("Error in fetchStats:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Wait for auth to initialize
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("Auth state changed: user logged in");
        fetchStats();
      } else {
        console.log("Auth state changed: no user");
        setLoading(false);
        setError("Please log in");
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome back,{" "}
          {auth.currentUser?.displayName || auth.currentUser?.email || "User"}!
        </h1>
        <p className="text-gray-600">Here's what's happening with your clubs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-gray-500 text-sm font-medium">Your Clubs</h3>
          <p className="text-2xl font-bold text-gray-800 mt-2">
            {stats.clubsCount}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-gray-500 text-sm font-medium">Upcoming Events</h3>
          <p className="text-2xl font-bold text-gray-800 mt-2">
            {stats.eventsCount}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-gray-500 text-sm font-medium">Notifications</h3>
          <p className="text-2xl font-bold text-gray-800 mt-2">
            {stats.notificationsCount}
          </p>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Activity
        </h2>
        <div className="bg-white rounded-lg shadow">
          {stats.recentActivity && stats.recentActivity.length > 0 ? (
            <div className="divide-y">
              {stats.recentActivity.map((activity, index) => (
                <div key={index} className="p-4">
                  <p className="text-gray-700">{activity.message}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(activity.timestamp).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-gray-500 text-center">
              No recent activity
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;

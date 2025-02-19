import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../components/firebase";

const API_URL = "http://localhost:3001/api"; // Base API URL

function Clubs() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const user = auth.currentUser;
        if (!user) throw new Error("Not authenticated");

        const token = await user.getIdToken();
        const response = await fetch(`${API_URL}/clubs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch clubs");
        const data = await response.json();
        setClubs(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, []);

  const handleViewDetails = (club) => {
    navigate(`/dashboard/clubs/${club.club_id}`, { state: { club } });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-purple-100 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-purple-800">Clubs</h1>
        <p className="text-gray-600">Browse and join clubs that interest you</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {clubs.map((club) => (
          <div
            key={club.club_id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold text-purple-900 mb-2">
                {club.name}
              </h2>
              <p className="text-gray-600 mb-4">{club.description}</p>
              <button
                onClick={() => handleViewDetails(club)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Clubs;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../components/firebase";
import CreateClubForm from "./CreateClubForm";

function ClubsPage() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const navigate = useNavigate();

  const fetchClubs = async () => {
    try {
      const user = auth.currentUser;
      const token = await user.getIdToken();

      const response = await fetch("http://localhost:3001/api/clubs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch clubs");
      }

      const data = await response.json();
      console.log("Fetched clubs:", data);
      setClubs(data);
    } catch (error) {
      console.error("Error fetching clubs:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  const handleClubCreated = (newClub) => {
    setClubs([...clubs, newClub]);
    setShowCreateForm(false);
  };

  const handleViewDetails = (clubId) => {
    navigate(`/dashboard/clubs/${clubId}`);
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Clubs</h1>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          {showCreateForm ? "Cancel" : "Create New Club"}
        </button>
      </div>

      {showCreateForm && (
        <div className="mb-6">
          <CreateClubForm onClubCreated={handleClubCreated} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs && clubs.length > 0 ? (
          clubs.map((club) => (
            <div
              key={club.club_id}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-xl font-bold mb-2">{club.name}</h2>
              <p className="text-gray-600 mb-4">{club.description}</p>
              <div className="flex justify-end">
                <button
                  onClick={() => handleViewDetails(club.club_id)}
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  View Details →
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center text-gray-500">
            No clubs found. Create one to get started!
          </div>
        )}
      </div>
    </div>
  );
}

export default ClubsPage;

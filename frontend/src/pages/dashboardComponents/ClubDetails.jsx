import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { auth } from "../../components/firebase";

const API_URL = "http://localhost:3001/api";

function ClubDetails() {
  const { clubId } = useParams();
  const navigate = useNavigate();
  const [club, setClub] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    start_time: "",
    end_time: "",
    venue: "",
    is_paid: false,
    price: "0",
  });

  const fetchClubDetails = async () => {
    try {
      const user = auth.currentUser;
      const token = await user.getIdToken();

      console.log("Fetching club:", clubId); // Debug log

      const response = await fetch(
        `http://localhost:3001/api/clubs/${clubId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response status:", response.status); // Debug log

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error data:", errorData); // Debug log
        throw new Error(errorData.error || "Failed to fetch club details");
      }

      const data = await response.json();
      console.log("Club data:", data); // Debug log
      setClub(data);
      setUserRole(data.user_role);
    } catch (error) {
      console.error("Detailed error:", error); // Debug log
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (clubId) {
      fetchClubDetails();
    }
  }, [clubId]);

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      const token = await user.getIdToken();

      const response = await fetch(`${API_URL}/clubs/${clubId}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...newEvent,
          price: newEvent.is_paid ? Number(newEvent.price) : 0,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create event");
      }

      const data = await response.json();
      console.log("Event created:", data);

      // Reset form and refresh club details
      setNewEvent({
        title: "",
        description: "",
        start_time: "",
        end_time: "",
        venue: "",
        is_paid: false,
        price: "0",
      });
      setShowCreateEvent(false);
      fetchClubDetails();
    } catch (error) {
      console.error("Error creating event:", error);
      setError(error.message);
    }
  };

  const handleJoinClub = async () => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Not authenticated");

      const token = await user.getIdToken();
      const response = await fetch(`${API_URL}/clubs/${clubId}/join`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to join club");

      // Refresh club details
      fetchClubDetails();
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    }
  };

  const handleRemoveMember = async (memberId) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Not authenticated");

      const token = await user.getIdToken();
      const response = await fetch(
        `${API_URL}/clubs/${clubId}/members/${memberId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action: "remove" }),
        }
      );

      if (!response.ok) throw new Error("Failed to remove member");

      // Refresh club details
      fetchClubDetails();
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    }
  };

  const handleBack = () => {
    navigate("/dashboard/clubs");
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error)
    return (
      <div className="p-4">
        <div className="text-red-600 mb-4">Error: {error}</div>
        <button
          onClick={handleBack}
          className="text-purple-600 hover:text-purple-700"
        >
          ← Back to Clubs
        </button>
      </div>
    );
  if (!club)
    return (
      <div className="p-4">
        <div className="mb-4">Club not found</div>
        <button
          onClick={handleBack}
          className="text-purple-600 hover:text-purple-700"
        >
          ← Back to Clubs
        </button>
      </div>
    );

  return (
    <div className="p-6">
      <button
        onClick={handleBack}
        className="text-purple-600 hover:text-purple-700 mb-4"
      >
        ← Back to Clubs
      </button>

      <div className="space-y-6">
        {/* Club Header */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-purple-900">
                {club.name}
              </h1>
              <p className="text-gray-600 mt-2">{club.description}</p>
            </div>
            {!userRole && (
              <button
                onClick={handleJoinClub}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
              >
                Join Club
              </button>
            )}
          </div>
        </div>

        {/* Events Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-purple-900">Events</h2>
            {userRole === "admin" && (
              <button
                onClick={() => setShowCreateEvent(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
              >
                Create Event
              </button>
            )}
          </div>

          {/* Event Creation Form */}
          {showCreateEvent && (
            <div className="mb-6 p-4 bg-purple-50 rounded-lg">
              <form onSubmit={handleCreateEvent} className="space-y-4">
                <input
                  type="text"
                  placeholder="Event Title"
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
                <textarea
                  placeholder="Event Description"
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, description: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Start Time
                    </label>
                    <input
                      type="datetime-local"
                      value={newEvent.start_time}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, start_time: e.target.value })
                      }
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      End Time
                    </label>
                    <input
                      type="datetime-local"
                      value={newEvent.end_time}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, end_time: e.target.value })
                      }
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Venue"
                  value={newEvent.venue}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, venue: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newEvent.is_paid}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, is_paid: e.target.checked })
                      }
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Paid Event</span>
                  </label>
                  {newEvent.is_paid && (
                    <input
                      type="number"
                      placeholder="Price"
                      value={newEvent.price}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, price: e.target.value })
                      }
                      className="w-32 p-2 border rounded"
                      min="0"
                      step="0.01"
                      required
                    />
                  )}
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowCreateEvent(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
                  >
                    Create Event
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Events List */}
          <div className="space-y-4">
            {club.events &&
              club.events.map((event) => (
                <div key={event.id} className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg">{event.title}</h3>
                  <p className="text-gray-600">{event.description}</p>
                  <div className="mt-2 text-sm text-gray-500">
                    <p>Start: {new Date(event.start_time).toLocaleString()}</p>
                    <p>End: {new Date(event.end_time).toLocaleString()}</p>
                    <p>Venue: {event.venue}</p>
                    {event.is_paid && <p>Price: ${event.price}</p>}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Members Section */}
        {userRole && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-purple-900 mb-4">
              Members
            </h2>
            <div className="space-y-2">
              {club.members &&
                club.members.map((member) => (
                  <div
                    key={member.user_id}
                    className="flex justify-between items-center p-2 hover:bg-gray-50 rounded"
                  >
                    <div>
                      <span className="font-medium">{member.name}</span>
                      <span className="text-sm text-gray-500 ml-2">
                        ({member.role})
                      </span>
                    </div>
                    {userRole === "admin" && member.role !== "admin" && (
                      <button
                        onClick={() => handleRemoveMember(member.user_id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClubDetails;

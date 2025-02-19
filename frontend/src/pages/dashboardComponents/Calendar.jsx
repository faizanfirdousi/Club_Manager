import React, { useState, useEffect } from "react";
import { auth } from "../../components/firebase";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function Calendar() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const user = auth.currentUser;
        if (!user) throw new Error("Not authenticated");

        const token = await user.getIdToken();
        const response = await fetch("http://localhost:3001/api/events/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch events");

        const data = await response.json();

        // Format events for the calendar
        const formattedEvents = data.map((event) => ({
          id: event.id,
          title: event.title,
          start: new Date(event.start_time),
          end: new Date(event.end_time),
          venue: event.venue,
          description: event.description,
          is_paid: event.is_paid,
          price: event.price,
        }));

        setEvents(formattedEvents);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 text-center p-4">Error: {error}</div>;
  }

  return (
    <div className="h-screen p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-purple-900">Calendar</h1>
      </div>

      <div
        className="bg-white rounded-lg shadow-md p-6"
        style={{ height: "calc(100vh - 200px)" }}
      >
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={handleSelectEvent}
          views={["month", "week", "day", "agenda"]}
          defaultView="month"
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: event.is_paid ? "#7C3AED" : "#059669",
              borderRadius: "4px",
            },
          })}
        />
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-semibold mb-4">
              {selectedEvent.title}
            </h2>
            <p className="text-gray-600 mb-2">
              {format(selectedEvent.start, "PPP p")} -{" "}
              {format(selectedEvent.end, "p")}
            </p>
            <p className="text-gray-700 mb-4">{selectedEvent.description}</p>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center text-gray-500">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>{selectedEvent.venue}</span>
              </div>
              {selectedEvent.is_paid ? (
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                  ₹{selectedEvent.price}
                </span>
              ) : (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  Free
                </span>
              )}
            </div>
            <button
              onClick={() => setSelectedEvent(null)}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendar;

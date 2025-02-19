const fetch = require("node-fetch");

const addEventToGoogleCalendar = async (
  googleAccessToken,
  title,
  description,
  start_time,
  end_time
) => {
  try {
    const event = {
      summary: title,
      description: description,
      start: { dateTime: start_time, timeZone: "Asia/Kolkata" }, // Change timezone as needed
      end: { dateTime: end_time, timeZone: "Asia/Kolkata" },
    };

    const response = await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${googleAccessToken}`, // ✅ Use user's Google OAuth token
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      }
    );

    if (!response.ok) {
      throw new Error(`Google Calendar API Error: ${response.statusText}`);
    }

    return await response.json(); // ✅ Return Google Calendar event details
  } catch (error) {
    console.error("Failed to add event to Google Calendar:", error);
    return null; // Return null if the Google Calendar request fails
  }
};

module.exports = { addEventToGoogleCalendar };

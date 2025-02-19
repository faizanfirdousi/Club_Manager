const db = require("../config/db");
const { addEventToGoogleCalendar } = require("../util/googleCalender");
const { createEventNotification } = require("./notificationController");

exports.getAllEvents = async (req, res) => {
  try {
    const [events] = await db.execute("SELECT * FROM events");
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

exports.getClubEvents = async (req, res) => {
  try {
    const { club_id } = req.params;

    const [events] = await db.execute(
      `SELECT 
        id as event_id,
        title,
        description,
        start_time,
        end_time,
        venue,
        is_paid,
        price
       FROM events 
       WHERE club_id = ? 
       AND start_time >= CURRENT_TIMESTAMP()
       ORDER BY start_time ASC`,
      [club_id]
    );

    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching club events:", error);
    res.status(500).json({ error: "Failed to fetch club events" });
  }
};

exports.getUserEvents = async (req, res) => {
  try {
    const user_id = req.user.uid;

    // Get all events from clubs where user is a member
    const [events] = await db.execute(
      `SELECT 
        e.id,
        e.title,
        e.description,
        e.start_time,
        e.end_time,
        e.venue,
        e.is_paid,
        e.price,
        c.name as club_name
       FROM events e
       JOIN clubs c ON e.club_id = c.club_id
       JOIN club_members cm ON c.club_id = cm.club_id
       WHERE cm.user_id = ?
       ORDER BY e.start_time ASC`,
      [user_id]
    );

    // Format dates for frontend
    const formattedEvents = events.map((event) => ({
      ...event,
      start_time: new Date(event.start_time).toISOString(),
      end_time: new Date(event.end_time).toISOString(),
    }));

    res.status(200).json(formattedEvents);
  } catch (error) {
    console.error("Error fetching user events:", error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

exports.getEvent = async (req, res) => {
  try {
    const { event_id } = req.params;
    const [events] = await db.execute("SELECT * FROM events WHERE id = ?", [
      event_id,
    ]);

    if (events.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json(events[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch event" });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const { club_id } = req.params;
    const { title, description, start_time, end_time, venue, is_paid, price } =
      req.body;
    const creator_id = req.user.uid;

    // Check if user is admin of the club
    const [admins] = await db.execute(
      "SELECT * FROM club_members WHERE club_id = ? AND user_id = ? AND role = 'admin'",
      [club_id, creator_id]
    );

    if (admins.length === 0) {
      return res
        .status(403)
        .json({ error: "Only club admins can create events" });
    }

    // Create event
    const [result] = await db.execute(
      `INSERT INTO events 
       (club_id, title, description, start_time, end_time, venue, is_paid, price) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [club_id, title, description, start_time, end_time, venue, is_paid, price]
    );

    // Create notifications for all club members
    await createEventNotification(club_id, result.insertId, {
      title,
      start_time,
      venue,
    });

    res.status(201).json({
      message: "Event created successfully",
      event_id: result.insertId,
    });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Failed to create event" });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { event_id } = req.params;
    const { title, description, start_time, end_time, venue, is_paid, price } =
      req.body;

    const [result] = await db.execute(
      `UPDATE events 
       SET title = ?, description = ?, start_time = ?, 
           end_time = ?, venue = ?, is_paid = ?, price = ? 
       WHERE id = ?`,
      [
        title,
        description,
        start_time,
        end_time,
        venue,
        is_paid,
        price || null,
        event_id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json({ message: "Event updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update event" });
  }
};

exports.removeEvent = async (req, res) => {
  try {
    const { event_id } = req.params;

    const [result] = await db.execute("DELETE FROM events WHERE id = ?", [
      event_id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete event" });
  }
};

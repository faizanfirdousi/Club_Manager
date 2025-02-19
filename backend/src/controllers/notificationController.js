const db = require("../config/db");

exports.createEventNotification = async (clubId, eventId, eventDetails) => {
  try {
    // Get all club members
    const [members] = await db.execute(
      "SELECT user_id FROM club_members WHERE club_id = ?",
      [clubId]
    );

    // Create notifications for each member
    const message = `New event: ${eventDetails.title} on ${new Date(
      eventDetails.start_time
    ).toLocaleDateString()} at ${eventDetails.venue}`;

    for (const member of members) {
      await db.execute(
        `INSERT INTO notifications 
         (user_id, club_id, event_id, message) 
         VALUES (?, ?, ?, ?)`,
        [member.user_id, clubId, eventId, message]
      );
    }

    return true;
  } catch (error) {
    console.error("Error creating notifications:", error);
    return false;
  }
};

exports.getUserNotifications = async (req, res) => {
  try {
    const user_id = req.user.uid;

    const [notifications] = await db.execute(
      `SELECT n.*, c.name as club_name, e.title as event_title 
       FROM notifications n
       JOIN clubs c ON n.club_id = c.club_id
       LEFT JOIN events e ON n.event_id = e.id
       WHERE n.user_id = ?
       ORDER BY n.created_at DESC
       LIMIT 50`,
      [user_id]
    );

    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};

exports.markNotificationAsRead = async (req, res) => {
  try {
    const { notification_id } = req.params;
    const user_id = req.user.uid;

    await db.execute(
      "UPDATE notifications SET is_read = TRUE WHERE id = ? AND user_id = ?",
      [notification_id, user_id]
    );

    res.status(200).json({ message: "Notification marked as read" });
  } catch (error) {
    console.error("Error updating notification:", error);
    res.status(500).json({ error: "Failed to update notification" });
  }
};

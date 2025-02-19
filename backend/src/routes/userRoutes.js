const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const { getUserDetails } = require("../controllers/userController");
const db = require("../config/db");

// Get user stats
router.get("/stats", async (req, res) => {
  try {
    const userId = req.user.uid;
    console.log("Fetching stats for user:", userId);

    // Check if tables exist first
    const [tables] = await db.execute(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = DATABASE()
    `);
    console.log("Available tables:", tables);

    // Get counts with error checking
    let clubsCount = 0;
    let eventsCount = 0;
    let notificationsCount = 0;

    try {
      const [clubs] = await db.execute(
        "SELECT COUNT(*) as count FROM clubs WHERE created_by = ?",
        [userId]
      );
      clubsCount = clubs[0].count;
    } catch (e) {
      console.error("Error counting clubs:", e);
    }

    try {
      const [events] = await db.execute(
        "SELECT COUNT(*) as count FROM events WHERE created_by = ?",
        [userId]
      );
      eventsCount = events[0].count;
    } catch (e) {
      console.error("Error counting events:", e);
    }

    try {
      const [notifications] = await db.execute(
        "SELECT COUNT(*) as count FROM notifications WHERE user_id = ? AND is_read = false",
        [userId]
      );
      notificationsCount = notifications[0].count;
    } catch (e) {
      console.error("Error counting notifications:", e);
    }

    const stats = {
      clubsCount,
      eventsCount,
      notificationsCount,
    };

    console.log("Sending stats:", stats);
    res.json(stats);
  } catch (error) {
    console.error("Error in /stats route:", error);
    res.status(500).json({
      error: "Failed to fetch user stats",
      details: error.message,
    });
  }
});

router.get("/:user_id", verifyToken, getUserDetails);

module.exports = router;

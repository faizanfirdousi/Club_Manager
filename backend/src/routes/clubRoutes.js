const express = require("express");
const router = express.Router();
const { verifyToken, checkAdmin } = require("../middleware/authMiddleware");
const {
  getAllClubs,
  getClub,
  getMemberRole,
  createClub,
  updateClub,
  deleteClub,
  getClubDetails,
} = require("../controllers/clubController");

const {
  getClubEvents,
  createEvent,
  updateEvent,
  removeEvent,
} = require("../controllers/eventController");

const {
  joinClub,
  manageMembership,
} = require("../controllers/memberController");

const db = require("../config/db");

// Debug middleware to log all requests
router.use((req, res, next) => {
  console.log(`Route accessed: ${req.method} ${req.originalUrl}`);
  next();
});

// Club routes
router.get("/", verifyToken, getAllClubs);
router.get("/:club_id", verifyToken, getClubDetails);
router.get("/:club_id/members/role", verifyToken, getMemberRole);
router.post("/", verifyToken, createClub);
router.put("/:club_id", verifyToken, checkAdmin, updateClub);
router.delete("/:club_id", verifyToken, checkAdmin, deleteClub);

// Club event routes
router.get("/:club_id/events", verifyToken, getClubEvents);
router.post("/:club_id/events", verifyToken, createEvent);
router.put("/:club_id/events/:event_id", verifyToken, checkAdmin, updateEvent);
router.delete(
  "/:club_id/events/:event_id",
  verifyToken,
  checkAdmin,
  removeEvent
);

// Membership routes
router.post("/:club_id/join", verifyToken, joinClub);
router.post("/:club_id/members/:member_id", verifyToken, manageMembership);

// Get all clubs
router.get("/", verifyToken, async (req, res) => {
  try {
    const userId = req.user.uid;
    const [rows] = await db.execute(
      "SELECT * FROM clubs WHERE created_by = ?",
      [userId]
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching clubs:", error);
    res.status(500).json({ error: "Failed to fetch clubs" });
  }
});

// Get a specific club
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM clubs WHERE id = ? AND created_by = ?",
      [req.params.id, req.user.uid]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "Club not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching club:", error);
    res.status(500).json({ error: "Failed to fetch club" });
  }
});

// Create a new club
router.post("/", verifyToken, async (req, res) => {
  try {
    const { name, description } = req.body;
    const userId = req.user.uid;
    const [result] = await db.execute(
      "INSERT INTO clubs (name, description, created_by) VALUES (?, ?, ?)",
      [name, description, userId]
    );
    res.status(201).json({
      id: result.insertId,
      name,
      description,
      created_by: userId,
    });
  } catch (error) {
    console.error("Error creating club:", error);
    res.status(500).json({ error: "Failed to create club" });
  }
});

module.exports = router;

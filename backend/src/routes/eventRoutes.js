const express = require("express");
const router = express.Router();
const { verifyToken, checkAdmin } = require("../middleware/authMiddleware");
const {
  getAllEvents,
  getClubEvents,
  getEvent,
  createEvent,
  updateEvent,
  removeEvent,
  getUserEvents,
} = require("../controllers/eventController");

// User events route - Changed from /events/user to /user
router.get("/user", verifyToken, getUserEvents);

// General event routes
router.get("/", verifyToken, getAllEvents);
router.get("/:event_id", verifyToken, getEvent);

// Club specific event routes - Moved to clubRoutes.js
// These routes should be in clubRoutes.js:
// router.get("/clubs/:club_id/events", verifyToken, getClubEvents);
// router.post("/clubs/:club_id/events", verifyToken, checkAdmin, createEvent);
// router.put("/clubs/:club_id/events/:event_id", verifyToken, checkAdmin, updateEvent);
// router.delete("/clubs/:club_id/events/:event_id", verifyToken, checkAdmin, removeEvent);

module.exports = router;

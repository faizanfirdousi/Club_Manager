const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const {
  getUserNotifications,
  markNotificationAsRead,
} = require("../controllers/notificationController");

router.get("/", verifyToken, getUserNotifications);
router.put("/:notification_id/read", verifyToken, markNotificationAsRead);

module.exports = router;

const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const db = require("../config/db");

// Test route that requires authentication
router.get("/auth-test", verifyToken, (req, res) => {
  res.json({
    message: "Authentication working!",
    user: req.user,
  });
});

// Test route for database
router.get("/db-test", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM users LIMIT 1");
    res.json({
      message: "Database connection working!",
      data: rows,
    });
  } catch (error) {
    console.error("Database test error:", error);
    res.status(500).json({
      error: "Database test failed",
      details: error.message,
    });
  }
});

module.exports = router;

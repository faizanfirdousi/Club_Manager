require("dotenv").config();
const express = require("express");
const cors = require("cors");
const testRoutes = require("./routes/testRoutes");
const clubRoutes = require("./routes/clubRoutes");
const eventRoutes = require("./routes/eventRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const userRoutes = require("./routes/userRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const userMiddleware = require("./middleware/checkAndAddUser");
const db = require("./config/db");
require("./config/firebase-admin");

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS for frontend communication

// Debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Public routes for testing
app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

app.get("/api/test", (req, res) => {
  res.json({ message: "API is working!" });
});

// Database test route
app.get("/api/db-test", async (req, res) => {
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

// Protected routes (require authentication)
app.use(
  "/api/clubs",
  authMiddleware.verifyToken,
  userMiddleware.checkAndAddUser,
  clubRoutes
);
app.use(
  "/api/events",
  authMiddleware.verifyToken,
  userMiddleware.checkAndAddUser,
  eventRoutes
);
app.use(
  "/api/notifications",
  authMiddleware.verifyToken,
  userMiddleware.checkAndAddUser,
  notificationRoutes
);
app.use(
  "/api/user",
  authMiddleware.verifyToken,
  userMiddleware.checkAndAddUser,
  userRoutes
);

// Test routes
app.use("/api/test", testRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

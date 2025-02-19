const admin = require("firebase-admin");
const db = require("../config/db");
require("dotenv").config();

// Load Firebase service account credentials
const serviceAccount = require("../config/kaizen-auth-20ca9-firebase-adminsdk-fbsvc-a8409b66c3.json"); // Updated path to match your new JSON file

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// Middleware to verify Firebase token
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).json({ error: "Invalid token" });
  }
};

const checkAdmin = async (req, res, next) => {
  try {
    const { club_id } = req.params; // Get club ID from request URL
    const user_id = req.user.uid; // Extract user ID from Firebase token

    // Check if club_id or user_id is missing
    if (!club_id || !user_id) {
      return res.status(400).json({ error: "Missing club ID or user ID" });
    }

    // Check if the user is an admin in the specified club
    const [result] = await db.execute(
      "SELECT role FROM club_members WHERE club_id = ? AND user_id = ?",
      [club_id, user_id]
    );

    if (result.length === 0) {
      return res
        .status(403)
        .json({ error: "Access denied: Not a club member" });
    }

    if (result[0].role !== "admin") {
      return res.status(403).json({ error: "Access denied: Admins only" });
    }

    next();
  } catch (error) {
    console.error("Admin Check Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { verifyToken, checkAdmin };

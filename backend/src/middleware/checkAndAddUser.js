const db = require("../config/db");

const checkAndAddUser = async (req, res, next) => {
  try {
    const user = req.user; // From verifyToken middleware

    // Check if user exists in database
    const [existingUsers] = await db.execute(
      "SELECT * FROM users WHERE user_id = ?",
      [user.uid]
    );

    if (existingUsers.length === 0) {
      // User doesn't exist, add them
      await db.execute(
        "INSERT INTO users (user_id, name, email) VALUES (?, ?, ?)",
        [user.uid, user.name || "Anonymous", user.email]
      );
    }

    next();
  } catch (error) {
    console.error("Error in checkAndAddUser middleware:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { checkAndAddUser };

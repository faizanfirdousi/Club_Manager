const db = require("../config/db");

exports.getUserDetails = async (req, res) => {
  try {
    const { user_id } = req.params;

    // Verify the requesting user is fetching their own data
    if (user_id !== req.user.uid) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const [users] = await db.execute(
      "SELECT first_name as firstName, last_name as lastName FROM users WHERE user_id = ?",
      [user_id]
    );

    if (users.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(users[0]);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: "Failed to fetch user details" });
  }
};

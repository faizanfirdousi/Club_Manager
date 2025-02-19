const db = require("../config/db");

exports.joinClub = async (req, res) => {
  try {
    const { club_id } = req.params;
    const user_id = req.user.uid;

    // Check if already a member
    const [existing] = await db.execute(
      "SELECT * FROM club_members WHERE club_id = ? AND user_id = ?",
      [club_id, user_id]
    );

    if (existing.length > 0) {
      return res.status(400).json({ error: "Already a member of this club" });
    }

    // Add as member
    await db.execute(
      "INSERT INTO club_members (club_id, user_id, role) VALUES (?, ?, 'member')",
      [club_id, user_id]
    );

    res.status(201).json({ message: "Successfully joined club" });
  } catch (error) {
    console.error("Error joining club:", error);
    res.status(500).json({ error: "Failed to join club" });
  }
};

exports.manageMembership = async (req, res) => {
  try {
    const { club_id, member_id } = req.params;
    const { action } = req.body; // 'remove' or 'change_role'
    const admin_id = req.user.uid;

    // Check if requester is admin
    const [admins] = await db.execute(
      "SELECT * FROM club_members WHERE club_id = ? AND user_id = ? AND role = 'admin'",
      [club_id, admin_id]
    );

    if (admins.length === 0) {
      return res.status(403).json({ error: "Only admins can manage members" });
    }

    if (action === "remove") {
      await db.execute(
        "DELETE FROM club_members WHERE club_id = ? AND user_id = ?",
        [club_id, member_id]
      );
    }

    res.status(200).json({ message: "Membership updated successfully" });
  } catch (error) {
    console.error("Error managing membership:", error);
    res.status(500).json({ error: "Failed to update membership" });
  }
};

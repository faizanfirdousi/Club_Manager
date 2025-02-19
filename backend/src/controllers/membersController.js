const db = require("../config/db");

exports.listMembers = async (req, res) => {
  try {
    const { club_id } = req.params;
    const [members] = await db.execute(
      "SELECT * FROM club_members WHERE club_id =?",
      [club_id]
    );
    res.status(200).json(members);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch members" });
  }
};

exports.joinClub = async (req, res) => {
  try {
    const { club_id } = req.params;
    const user_id = req.user.uid;

    const [club] = await db.execute("SELECT * FROM clubs WHERE club_id = ?", [
      club_id,
    ]);
    if (club.length === 0) {
      return res.status(404).json({ error: "Club not found" });
    }

    const [existingMember] = await db.execute(
      "SELECT * FROM club_members WHERE club_id = ? AND user_id = ?",
      [club_id, user_id]
    );
    if (existingMember.length > 0) {
      return res
        .status(400)
        .json({ error: "Membership request already exists" });
    }

    await db.execute(
      "INSERT INTO club_members (club_id, user_id, status) VALUES (?, ?, 'pending')",
      [club_id, user_id]
    );

    res
      .status(200)
      .json({ message: "Membership request submitted for approval." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.removeMember = async (req, res) => {
  try {
    const { club_id, user_id } = req.params;
    const [result] = await db.execute(
      "DELETE FROM club_members WHERE club_id = ? AND user_id = ?",
      [club_id, user_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Member not found in this club" });
    }

    res.status(200).json({ message: "Member removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

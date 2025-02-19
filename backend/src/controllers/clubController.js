const db = require("../config/db"); // Import DB connection

exports.getAllClubs = async (req, res) => {
  try {
    const [clubs] = await db.execute("SELECT * FROM clubs");
    res.status(200).json(clubs);
  } catch (error) {
    console.error("Error fetching clubs:", error);
    res.status(500).json({ error: "Failed to fetch clubs" });
  }
};

exports.createClub = async (req, res) => {
  try {
    const { name, description } = req.body;
    const creator_id = req.user.uid; // From Firebase auth

    // Start a transaction
    const connection = await db.getConnection();
    await connection.beginTransaction();

    try {
      // Create the club
      const [clubResult] = await connection.execute(
        "INSERT INTO clubs (name, description, created_by, admin_id) VALUES (?, ?, ?, ?)",
        [name, description, creator_id, creator_id]
      );

      const club_id = clubResult.insertId;

      // Add creator as admin member
      await connection.execute(
        "INSERT INTO club_members (club_id, user_id, role) VALUES (?, ?, 'admin')",
        [club_id, creator_id]
      );

      await connection.commit();

      res.status(201).json({
        message: "Club created successfully",
        club_id: club_id,
      });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error creating club:", error);
    res.status(500).json({ error: "Failed to create club" });
  }
};

exports.getClub = async (req, res) => {
  try {
    const { club_id } = req.params;
    console.log("Fetching club with ID:", club_id);

    const [clubs] = await db.execute(
      `SELECT c.*, 
        COUNT(DISTINCT cm.user_id) as member_count 
       FROM clubs c 
       LEFT JOIN club_members cm ON c.club_id = cm.club_id 
       WHERE c.club_id = ? 
       GROUP BY c.club_id`,
      [club_id]
    );

    console.log("Query result:", clubs);

    if (clubs.length === 0) {
      return res.status(404).json({ error: "Club not found" });
    }

    res.status(200).json(clubs);
  } catch (error) {
    console.error("Error fetching club details:", error);
    res.status(500).json({ error: "Failed to fetch club details" });
  }
};

exports.updateClub = async (req, res) => {
  try {
    const { club_id } = req.params;
    const { name, description } = req.body;

    const [result] = await db.execute(
      "UPDATE clubs SET name = ?, description = ? WHERE club_id = ?",
      [name, description, club_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Club not found" });
    }

    res.status(200).json({ message: "Club updated successfully" });
  } catch (error) {
    console.error("Error updating club:", error);
    res.status(500).json({ error: "Failed to update club" });
  }
};

exports.deleteClub = async (req, res) => {
  try {
    const { club_id } = req.params;

    const [result] = await db.execute("DELETE FROM clubs WHERE club_id = ?", [
      club_id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Club not found" });
    }

    res.status(200).json({ message: "Club deleted successfully" });
  } catch (error) {
    console.error("Error deleting club:", error);
    res.status(500).json({ error: "Failed to delete club" });
  }
};

exports.getClubEvents = async (req, res) => {
  try {
    const { club_id } = req.params;
    console.log("Fetching events for club:", club_id);

    const query = `SELECT 
      id as event_id,
      title,
      description,
      start_time as date,
      venue as location,
      end_time
    FROM events 
    WHERE club_id = ? 
    AND start_time >= CURRENT_TIMESTAMP()
    ORDER BY start_time ASC`;

    console.log("Executing query:", query);

    const [events] = await db.execute(query, [club_id]);
    console.log("Events found:", events);

    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching club events:", error);
    res.status(500).json({ error: "Failed to fetch club events" });
  }
};

exports.getMemberRole = async (req, res) => {
  try {
    const { club_id } = req.params;
    const user_id = req.user.uid;

    // Updated query to match your exact schema
    const [members] = await db.execute(
      `SELECT role, joined_at 
       FROM club_members 
       WHERE club_id = ? AND user_id = ?`,
      [club_id, user_id]
    );

    if (members.length === 0) {
      // If user is not a member, return default role
      return res.status(200).json({
        role: "member",
        isMember: false,
        joined_at: null,
      });
    }

    // Return full member information
    res.status(200).json({
      role: members[0].role,
      isMember: true,
      joined_at: members[0].joined_at,
    });
  } catch (error) {
    console.error("Error fetching member role:", error);
    res.status(500).json({ error: "Failed to fetch member role" });
  }
};

exports.getClubDetails = async (req, res) => {
  try {
    const { club_id } = req.params;
    const user_id = req.user.uid;

    // Get club details
    const [clubs] = await db.execute(
      `SELECT c.*, 
        (SELECT role FROM club_members WHERE club_id = c.club_id AND user_id = ?) as user_role
       FROM clubs c 
       WHERE c.club_id = ?`,
      [user_id, club_id]
    );

    if (clubs.length === 0) {
      return res.status(404).json({ error: "Club not found" });
    }

    // Get members if user is a member or admin
    let members = [];
    if (clubs[0].user_role) {
      [members] = await db.execute(
        `SELECT cm.*, u.name, u.email 
         FROM club_members cm
         JOIN users u ON cm.user_id = u.user_id
         WHERE cm.club_id = ?`,
        [club_id]
      );
    }

    // Get events
    const [events] = await db.execute(
      "SELECT * FROM events WHERE club_id = ? ORDER BY start_time ASC",
      [club_id]
    );

    res.status(200).json({
      ...clubs[0],
      members,
      events,
    });
  } catch (error) {
    console.error("Error fetching club details:", error);
    res.status(500).json({ error: "Failed to fetch club details" });
  }
};

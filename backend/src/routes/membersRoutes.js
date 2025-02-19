const express = require("express");
const { verifyToken, checkAdmin } = require("../middleware/authMiddleware");

const {
  listMembers,
  joinClub,
  removeMember,
} = require("../controllers/membersController");

const router = express.Router();

// router.post("/", verifyToken, checkRole("admin"), createClub);
// router.get("/", verifyToken, getAllClubs);

router.get("/:club_id", verifyToken, listMembers);
router.post("/:club_id", verifyToken, joinClub);
router.delete("/:club_id/:user_id", verifyToken, checkAdmin, removeMember);

module.exports = router;

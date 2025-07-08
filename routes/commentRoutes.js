const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/authMiddleware");
const {
  addComment,
  getAllComments,
} = require("../controllers/commentController");

router.post("/:postId", auth, addComment);
router.get("/:postId", getAllComments);
module.exports = router;

const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/authMiddleware");
const {
  addComment,
  getAllComments,
  updateComment,
  deleteComment
} = require("../controllers/commentController");

router.post("/:postId", auth, addComment);
router.get("/:postId", getAllComments);
router.put("/update/:commentId", auth,updateComment);
router.delete("/delete/:commentId", auth, deleteComment);
module.exports = router;

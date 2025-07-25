const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/authMiddleware");
const { likePost, getAllLikes } = require("../controllers/likeController");

router.post("/:postId", auth, likePost);
router.get("/:postId", getAllLikes);
module.exports = router;

const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/authMiddleware");
const { likePost, getAllLikes } = require("../controllers/likeController");

router.post("/likePost", auth, likePost);
router.get("/getAllLikes/:postId", getAllLikes);
module.exports = router;

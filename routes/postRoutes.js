const express = require("express");
const router = express.Router();

const { createPost, getAllPosts } = require("../controllers/postController");
const { auth } = require("../middleware/authMiddleware");

router.post("/createPost", auth, createPost);
router.get("/getAllPost", getAllPosts );
module.exports = router;
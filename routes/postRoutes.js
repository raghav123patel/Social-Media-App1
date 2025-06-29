const express = require("express");
const router = express.Router();

const {
  createPost,
  getAllPosts,
  updatePost,
} = require("../controllers/postController");
const { auth } = require("../middleware/authMiddleware");

router.post("/createPost", auth, createPost);
router.get("/getAllPost", getAllPosts);
router.post("/updatePost/:id", auth, updatePost);
module.exports = router;

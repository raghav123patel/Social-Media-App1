const express = require("express");
const router = express.Router();

const {
  createPost,
  getAllPosts,
  updatePost,
  createPostWithImage,
} = require("../controllers/postController");
const { auth } = require("../middleware/authMiddleware");
const upload = require("../middleware/multerMiddleware");
router.post("/createPost", auth, createPost);
router.get("/getAllPost", getAllPosts);
router.post("/updatePost/:id", auth, updatePost);
router.post("/createPosts", auth, upload.single("file"), createPostWithImage);
module.exports = router;

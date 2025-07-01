const express = require("express");
const router = express.Router();

const {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
  getSinglePost,
} = require("../controllers/postController");
const { auth } = require("../middleware/authMiddleware");
const upload = require("../middleware/multerMiddleware");
router.post("/createPost", auth, upload.single("file"), createPost);
router.get("/getAllPost", getAllPosts);
router.put("/updatePost/:id", auth, updatePost);
router.delete("/deletePost/:id", auth, deletePost);
router.get("/getSinglePost/:id", getSinglePost);
module.exports = router;

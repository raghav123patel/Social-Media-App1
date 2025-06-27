const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/authMiddleware");
const { likePost} = require("../controllers/likeController");

router.post("/likePost", auth, likePost);

module.exports = router;
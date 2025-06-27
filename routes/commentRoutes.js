const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/authMiddleware");
const { addComment } = require("../controllers/commentController");

router.post("/commentonPost", auth, addComment);

module.exports = router;
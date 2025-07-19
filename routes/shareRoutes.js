const express = require("express");
const router = express.Router();
const { sharePost , getAllShares} = require("../controllers/shareController");
const { auth} = require("../middleware/authMiddleware");


router.post("/:postId", auth, sharePost);
router.get("/:postId", getAllShares );

module.exports = router;
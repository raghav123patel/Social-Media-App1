const express = require("express");
const router = express.Router();

const { register, login } =  require("../controllers/userController");
const  upload = require("../middleware/multerMiddleware");

router.post("/signup", upload.single("file"), register);
router.post("/login", login);
module.exports = router;
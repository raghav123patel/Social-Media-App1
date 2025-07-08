const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const imagekit = require("../config/imageConfig");
const jwt = require("jsonwebtoken");
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const file = req.file;

    if(!firstName || !lastName || !email || !password || !file){
        return res.status(400).json({ 
            success: false,
            message: "please fill all the fields" 
        });
    }

    const isExisting = await User.findOne({ email });
    if (isExisting){
      return res.status(400).json({ 
        success: false,
        message: "Email already exists" 
    });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const uploadedImage = await imagekit.upload({
      file: file.buffer,
      fileName: req.file.originalname,
      folder: "image_uploads",
    });
    
    
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      imageUrl: uploadedImage.url,
    });
    user.password=undefined;  
    res.status(200).json({ 
        success: true,
        message: "User registered successfully", 
        user ,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ 
        success: false,
        message: "internal server error" 
    });
  }  
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide the correct details",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({
        success: false,
        message: "Password incorrect",
      });
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    return res.status(200).json({
      success: true,
      token,
      user,
      message: "User logged in successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",  
    });
  }
};
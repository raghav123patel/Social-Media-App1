const Like = require("../models/likeModel");
const Post = require("../models/postModel");
exports.likePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const likePost = await Like.create({
      post: postId,
      userId: req.user.id,
    });
    await Post.findByIdAndUpdate(postId, { $push: { likes: likePost._id } });
    return res.status(200).json({
      success: true,
      likePost,
      message: "user successfully liked the post",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "user cannot like the post",
    });
  }
};

exports.getAllLikes = async (req, res) => {
  try {
    const { postId } = req.params;

    const allLikes = await Like.find({ post: postId }).populate(
      "userId",
      "firstName lastName"  
    );

    return res.status(200).json({
      success: true,
      allLikes,
      message: "All likes fetched successfully",
    });
  } catch (error) {
    console.error("Error in getAllComments:", error); 
    return res.status(500).json({
      success: false,
      message: "Server error while fetching all likes",
    });
  }
};

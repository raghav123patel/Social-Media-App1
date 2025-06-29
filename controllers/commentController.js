const Comment = require("../models/commentModel");
const Post = require("../models/postModel");
exports.addComment = async (req, res) => {
  try {
    const { postId, body } = req.body;
    const comment = await Comment.create({
      post: postId,
      userId: req.user.id,
      body,
    });
    await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } });
    return res.status(200).json({
      success: true,
      comment,
      message: "user successfully commented on the post",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "user cannot comment the post",
    });
  }
};

exports.getAllComments = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ post: postId }).populate(
      "userId",
      "firstName lastName imageUrl"
    );

    return res.status(200).json({
      success: true,
      comments,
      message: "All comments fetched successfully",
    });
  } catch (error) {
    console.error("Error in getAllComments:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching comments",
    });
  }
};

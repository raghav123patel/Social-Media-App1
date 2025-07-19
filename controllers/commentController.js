const Comment = require("../models/commentModel");
const Post = require("../models/postModel");
exports.addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { body } = req.body;
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


exports.updateComment = async(req,res) => {
  try {
    const { commentId } = req.params;
    const { body } = req.body;
    const userId = req.user.id;
    console.log(userId);
    if(!body){
      return res.status(500).json({
        success: "false",
        message: "please provide the comment content and the post id",
      })
    }
    const commentUpdate = await Comment.findById(commentId);
    console.log(commentUpdate);
    if(commentUpdate.userId.toString() !== userId) {
      return res.status(403).json({
        success: "false",
        message: "you are not authorized to update the comment",
      })
    }
     commentUpdate.body = body;
     await commentUpdate.save();
    
    return res.status(200).json({
      success: "true",
      commentUpdate,
      message: "comment update successfully",

    })
  } catch(error) {
    console.log(error);
    return res.status(500).json({
       success: "false",
       message: "you cannot update the post"
    })
  }
}



exports.deleteComment = async(req,res) => {
  try {
    const { commentId} = req.params;
    if(!commentId) {
      return res.status(300).json({
        success: "false",
        message: "provide the comment id"
      })
    }
    const commentDelete = await Comment.findById(commentId);
    if(commentDelete.userId.toString() !== req.user.id){
      return res.status(403).json({
        success: "false",
        message: "you are not authorized to delete the post"
      })
    }
     return res.status(200).json({
        success: "true",
        commentDelete,
        message: "comment deleted successfully"
      })
  } catch(error){
    return res.status(500).json({
      success: false,
      message: "comment cannot be deleted",
    })
  }
}
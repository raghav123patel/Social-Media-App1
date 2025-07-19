const Share = require("../models/shareModel");
const Post = require("../models/postModel");


exports.sharePost = async(req,res) => {
    try{
      const { postId } = req.params;
      if(!postId) {
        return res.status(500).json({
            success: "false",
            message: "please provide the post id"

        })
      }
      const sharePost = await Share.create({
        post: postId,
        user: req.user.id,
      })
    await Post.findByIdAndUpdate(postId, {$push: {shares: sharePost._id}})
    return res.status(200).json({
        success: true,
        sharePost,
        message: "successfully shared the post"
    })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: "false",
            message: "error in sharing the post"

        })
    }
}


exports.getAllShares = async(req,res) => {
    try {
      const {postId} = req.params;
       if(!postId) {
        return res.status(500).json({
            success: "false",
            message: "please provide the post id"

        })
      }
      const getAllShares = await Share.find({post: postId}).populate("user", "firstName lastName");
      return res.status(200).json({
        success: "true",
        getAllShares,
        message: "all shares of the post fetched successfully"
      })
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "error in sharing the post"
        })      
    }
}
const Like = require("../models/likeModel");

exports.likePost = async(req,res) => {
    try{
        const {postId} = req.body;
      const likes =  await Like.create({
        post: postId,
        userId: req.user.id,

      })
      return res.status(200).json({
        success: true,
        likes,
        message: "user successfully liked the post"
      })
    } catch(error){
        console.log(error);
        return res.status(500).json({
        success: false,
        message: "user cannot like the post"
    })
}
}
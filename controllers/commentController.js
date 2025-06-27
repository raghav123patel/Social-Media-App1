const Comment = require("../models/commentModel");


exports.addComment = async(req,res) => {
    try{
        const {postId, body} = req.body;
      const comment =  await Comment.create({
        post: postId,
        userId: req.user.id,
        body,

      })
      return res.status(200).json({
        success: true,
        comment,
        message: "user successfully commented on the post"
      })
    } catch(error){
        console.log(error);
        return res.status(500).json({
        success: false,
        message: "user cannot comment the post"
    })
}
}
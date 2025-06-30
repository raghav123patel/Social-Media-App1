const imageKit = require("../config/imageConfig");
const Post = require("../models/postModel");

exports.createPost = async (req, res) => {
  try {
    const { title, body } = req.body;
    if (!title || !body) {
      return res.status().json({
        success: false,
        message: "post cannot be created",
      });
    }
    const posts = await Post.create({
      userId: req.user.id,
      title,
      body,
    });
    return res.status(200).json({
      success: true,
      posts,
      message: "successfully posted the content",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "post cannot be created",
    });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.find({});
    return res.status(200).json({
      success: true,
      data: allPosts,
      message: "all posts fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "cannot get all the posts",
    });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { title, body } = req.body;
    const { id } = req.params;
    if (!title || !body || !id) {
      return res.status(500).json({
        success: false,
        message: "please provide all the fields,",
      });
    }
    const postUpdate = await Post.findByIdAndUpdate(
      id,
      { title, body },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      postUpdate,
      message: "successfully updated the post",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "not able to update the post",
    });
  }
};

exports.createPostWithImage = async (req, res) => {
  try {
    const { title, body } = req.body;
    const file = req.file;
    if (!title || !body || !file) {
      return res.status(400).json({
        success: false,
        message: "post cannot be created",
      });
    }
    const uploadImage = await imageKit.upload({
      file: file.buffer,
      fileName: req.file.originalname,
      folder: "image_uploads",
    });
    const posts = await Post.create({ 
      userId: req.user.id,
      title,
      body,
      imageUrl: uploadImage.url,
    });
    return res.status(200).json({
      success: true,
      posts,
      message: "successfully posted the content",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "post cannot be created",
    });
  }
};

exports.deletePost = async(req,res) => {
  try{
    const {id} = req.params;
    if(!id){
      return res.status(500).json({
      success: false,
      message: "please provide for the post deletion",
    })
    }
    const deletedPost = await Post.findByIdAndDelete(
      id,
    );
    return res.status(200).json({
      success: true,
      deletedPost,
      message: "successfully deleted the post",
    })
  } catch(error){
    console.log("error in deleting the post", error);
    return res.status(500).json({
      success: false,
      message: "post cannot be deleted",
    })
  }
}



exports.getSinglePost = async(req,res) => {
  try{
    const {id} = req.params;
    if(!id){
      return res.status(500).json({
      success: false,
      message: "please provide the id",
    });
  }
    const findPost = await Post.findById({_id: id}).populate("userId", "firstName lastName");
     return res.status(200).json({
      success: true,
      findPost,
      message: "post finded successfully with all the likes and comments",
    })
  } catch(error){
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "cannot find the post",
    })
  }
}


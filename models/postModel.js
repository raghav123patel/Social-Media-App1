const mongoose = require("mongoose");
const postSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {    
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },   
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,   
      ref: "Like", 
    },   
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  imageUrl: {
    type: String,
  },
})                                                                                                               ;

module.exports = mongoose.model("Post", postSchema);  

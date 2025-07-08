const express = require("express");
const cors = require('cors');
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 7000;
app.use(express.json());
app.use(cors());
const routes = require("./routes/authRoutes");
app.use("/api/v1/auth", routes);
const postRoutes = require("./routes/postRoutes");
app.use("/api/v1/posts", postRoutes);
const likeRoutes = require("./routes/likeRoutes");
app.use("/api/v1/likes", likeRoutes);
const commentRoutes = require("./routes/commentRoutes");
app.use("/api/v1/comments", commentRoutes);
const connectWithDb = require("./config/database");
connectWithDb();

if(process.env.VERCEL){
    module.exports = app;
}else{
app.listen(PORT , () => {
    console.log(`Server is running at the port ${PORT}`);
})
}
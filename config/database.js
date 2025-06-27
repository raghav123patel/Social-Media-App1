const mongoose = require("mongoose");
const connectWithDb = async () => {
  await mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("connection is successful with database");
    })
    .catch(() => {
      console.log("connection is not successful with database");
    });
};

module.exports = connectWithDb;
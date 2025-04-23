const mongoose = require("mongoose");

let connectDB = async () => {
  await mongoose.connect("mongodb://localhost:27017/form-Data");
  console.log("database connected....");
};

module.exports = { connectDB };

//& url ==> "mongodb://localhost:27017/formData"
//& formData ==> database name

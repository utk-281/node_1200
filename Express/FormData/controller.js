const fs = require("fs");
const { connectDB } = require("./config/db");

let displayHomePage = (req, res) => {
  res.send("home page");
};

let displayFormPage = (req, res) => {
  //   res.send("form page");
  fs.createReadStream("./form.html", "utf-8").pipe(res);
};

let displayAllUsers = async (req, res) => {
  let collection = await connectDB();
  let data = await collection.find().toArray();
  res.json(data);
};

let displayCSSContents = (req, res) => {
  fs.createReadStream("./styles.css", "utf-8").pipe(res);
};

let handleFormSubmit = async (req, res) => {
  //! set form action to a value, and use the same value as the endpoint in the post method
  //! set form method to post
  //! use name attribute
  //? data is stored in req.body
  console.log(req.body);

  let myCollection = await connectDB();
  // console.log(myCollection);
  let { userEmail, userName, userPassword } = req.body;
  let dataInserted = await myCollection.insertOne({ userEmail, userName, userPassword }); //{}
  console.log(dataInserted);

  res.send("data submiteed");
};

module.exports = {
  displayHomePage,
  displayFormPage,
  displayAllUsers,
  displayCSSContents,
  handleFormSubmit,
};

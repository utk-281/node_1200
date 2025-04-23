//& 1) import the collection
const userCollection = require("../models/user.model");

//! define CRUD

let addUser = async (req, res) => {
  let { name, email, password, phone } = req.body;
  //& 1st way ==> create()
  //   let newUser = await userCollection.create({ name, email, password, phone });
  //& 2nd way ==> save()
  let newUser = new userCollection({ name, email, password, phone });
  await newUser.save();
  res.send("user added successfully");
};

let fetchAllUsers = async (req, res) => {
  let users = await userCollection.find();
  res.send(users);
};

let fetchOneUser = async (req, res) => {};

let updateUser = async (req, res) => {};

let deleteUser = async (req, res) => {};

module.exports = {
  addUser,
  fetchAllUsers,
};

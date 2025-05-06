//& 1) import the collection
const userCollection = require("../models/user.model");
const { generateToken } = require("../utils/jwt.utils");

//! define CRUD

let addUser = async (req, res) => {
  try {
    console.log(req.body);
    // let { name, email, password, phone } = req.body;
    //& 1st way ==> create()
    //   let newUser = await userCollection.create({ name, email, password, phone });
    //& 2nd way ==> save()
    let newUser = new userCollection(req.body);
    await newUser.save();
    // res.send("user added successfully");
    //! json response
    res.status(201).json({
      success: true,
      message: "user added successfully",
      newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong while adding a user",
      //   errorObject: error,
      errMessage: error.message,
    });
  }
};

let fetchAllUsers = async (req, res) => {
  let users = await userCollection.find();
  // res.send(users);

  if (users.length === 0) {
    return res.status(200).json({ message: "no users found" });
  }

  res.status(200).json({
    success: true,
    message: "users fetched successfully",
    count: users.length,
    data: users,
  });
};

let fetchOneUser = async (req, res) => {
  console.log(req.params);
  let extractedID = req.params.id;
  console.log(extractedID);

  let user = await userCollection.findOne({ _id: extractedID });
  // userCollection.findById();

  if (!user) {
    return res.status(404).json({ message: "no user found" });
  }

  res.status(200).json({ success: true, message: "user fetched successfully", user });
};

let updateUser = async (req, res) => {
  console.log(req.body);
  let { id } = req.params;
  let { name, email, phone, password } = req.body;
  // let user = await userCollection.findOne({ _id: id });
  //! 1st way
  // user.name = updatedName || user.name;
  // user.email = updatedEmail || user.email;
  // user.phone = updatedPhone || user.phone;
  // user.password = updatedPassword || user.password; // assigning the value

  // await user.save(); // saving the value
  let user = await userCollection.findOne({ _id: id });
  //TODO ==> 404
  if (!user) return res.status(200).json({ message: "no user found" });

  let result = await userCollection.updateOne({ _id: id }, { $set: req.body });
  // userCollection.findByIdAndUpdate()
  // console.log(result);

  let updatedUser = await userCollection.findOne({ _id: id });

  // res.send("user updated successfully");
  res.status(200).json({
    success: true,
    message: "user updated successfully",
    updatedUser,
  });
};

let deleteUser = async (req, res) => {
  let { id } = req.params;
  // let  id  = req.params.id

  let user = await userCollection.findOne({ _id: id });
  if (!user) return res.status(404).json({ message: "no user found" });

  let result = await userCollection.deleteOne({ _id: id });
  // userCollection.findByIdAndDelete()
  console.log("user deleted");

  //   res.send(`user ${name} deleted successfully`);
  res.status(200).json({
    success: true,
    message: "user deleted successfully",
    user,
  });
};

let login = async (req, res) => {
  try {
    //? destructure email and password
    let { email, password } = req.body;
    //? check if user exists
    let existingUser = await userCollection.findOne({ email });
    console.log(existingUser);
    if (!existingUser) return res.status(404).json({ message: "email not found" });
    //? if exists check password
    let isMatch = await existingUser.comparePassword(password);
    // let isMatch  = {name:"abc", password:hashedPassword}.comparePassword("1234")
    // console.log(isMatch);
    if (!isMatch) return res.status(400).json({ message: "invalid credentials" });

    let token = await generateToken(existingUser._id); // user's _id
    console.log(token);

    res.cookie("my-cookie", token, {
      maxAge: 1 * 60 * 60 * 1000, // in milliseconds
    });

    /*   res.cookie("cookie_name", value, {
      maxAge: 1 * 60 * 60 * 1000, // in milliseconds
    }); */

    res.status(200).json({ success: true, message: "user logged in", token });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error while logging in",
      errObject: error,
    });
  }
};

let logout = async (req, res) => {
  res.clearCookie("my-cookie");
  res.status(200).json({ success: true, message: "user logged out" });
};

module.exports = {
  addUser,
  fetchAllUsers,
  fetchOneUser,
  updateUser,
  deleteUser,
  login,
  logout,
};

/*
[Object: null prototype] { id: '68089a9c36c22615c911992f' }
*/

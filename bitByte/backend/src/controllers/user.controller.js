const userCollection = require("../models/user.model");
const asyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/ErrorHandler");
const { generateToken } = require("../utils/jwt.utils");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;

  let existingUser = await userCollection.findOne({ email });
  if (existingUser) throw new ErrorHandler("email already exists", 400);

  let newUser = await userCollection.create({ name, email, password, phoneNumber });
  res.status(201).json({
    success: true,
    message: "user registered successfully",
    data: newUser,
  });
  // new ApiResponse(true, "msg", data)
});

const loginUser = asyncHandler(async (req, res) => {
  let { email, password } = req.body;

  //! check if email exists in db
  let existingUser = await userCollection.findOne({ email });
  if (!existingUser) throw new ErrorHandler("please register first", 400);

  //! match the password
  let isMatched = await existingUser.comparePassword(password);
  if (!isMatched) throw new ErrorHandler("invalid password", 400);

  let token = await generateToken(existingUser._id, existingUser.tokenVersion);
  console.log(token);

  res.cookie("myCookie", token, {
    maxAge: 1 * 60 * 60 * 1000, // maxAge ==> in milliseconds (cookie will expire in 1 hr)
    secure: true,
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "user logged in successfully",
    token,
  });
});

const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("myCookie");

  // await userCollection.findByIdAndUpdate(
  //   req.myUser._id, // filter
  //   { $inc: { tokenVersion: 1 } } // update
  // );

  await userCollection.updateOne({ _id: req.myUser._id }, { $inc: { tokenVersion: 1 } });

  res.status(200).json({
    success: true,
    message: "user logged out successfully",
  });
});

const updateUserProfile = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { _id } = req.myUser;
  const { name, email, phoneNumber } = req.body;

  const updatedUser = await userCollection.findByIdAndUpdate(
    { _id },
    { $set: { name, email, phoneNumber } },
    { new: true } // it returns the updated document
  );

  //TODO==>
  // const updateUserPut = await userCollection.updateOne(
  //   { _id: _id },
  //   {
  //     $set: {
  //       name: req.body.name,
  //       email: req.body.email,
  //       phoneNumber: req.body.phoneNumber,
  //     },
  //   },
  //   {
  //     overwrite: true,
  //   }
  // );

  res.status(200).json({
    success: true,
    message: "user updated successfully",
    data: updatedUser,
  });
}); // we can update name, email and phoneNumber

const updateUserPassword = asyncHandler(async (req, res) => {}); //TODO

const deleteUserProfile = asyncHandler(async (req, res) => {
  const { _id } = req.myUser; // this we will get from authenticate middleware
  let deletedUser = await userCollection.findByIdAndDelete({ _id }); // findOne and deleteOne
  //! if not found, throw error
  // if (!deletedUser) throw new ErrorHandler("user not found", 404);
  res.status(200).json({
    success: true,
    message: "user deleted successfully",
    data: deletedUser,
  });
}); // delete the profile

const getLoggedInUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    userDetails: req.myUser,
  });
}); // in the frontend

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  deleteUserProfile,
  getLoggedInUserProfile,
  updateUserProfile,
};

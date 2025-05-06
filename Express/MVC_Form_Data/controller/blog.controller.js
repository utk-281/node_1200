//! import the collection
const blogCollection = require("../models/blogs.model");
let asyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/errorHandler");

//! insert a blog
const createBlog = asyncHandler(async (req, res) => {
  //! user details

  let { title, description } = req.body;
  let { _id } = req.myUser;
  let newBlog = await blogCollection.create({
    title,
    description,
    createdBy: _id,
  });
  res.status(201).json({
    success: true,
    message: "blog created successfully",
    newBlog,
  });
});

//! fetching all blogs
const fetchAllBlogs = async (req, res, next) => {
  try {
    let blogs = await blogCollection.find({ createdBy: req.myUser._id }); // array

    if (blogs.length === 0) {
      // error response
      // return res.status(200).json({ message: "no blogs found" });
      // console.log(new Error("no blogs found", 404));
      // throw new Error("no blogs found", 404);
      console.log(new ErrorHandler("no blogs found", 404));
      return next(new ErrorHandler("no blogs found", 404));
    }

    res.status(200).json({
      success: true,
      message: "blogs fetched successfully",
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong while fetching all blogs",
      //   errorObject: error,
      errMessage: error.message,
    });
  }
};

//! fetch one blog
const fetchOneBlog = async (req, res) => {
  try {
    let { id } = req.params;
    let blog = await blogCollection.findOne({ _id: id, createdBy: req.myUser._id });
    if (!blog) return res.status(404).json({ message: "no blog found" });
    res.status(200).json({
      success: true,
      message: "blog fetched successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong while fetching one blog",
      //   errorObject: error,
      errMessage: error.message,
    });
  }
};

//! update a blog
const updateBlog = async (req, res) => {
  try {
    let { id } = req.params;
    // console.log(req?.body);
    // console.log(req.body);
    if (req.body === undefined) {
      return res.status(400).json({ message: "please provide valid data" });
    }

    let { title, description } = req.body; // optional chaining
    let blog = await blogCollection.findOne({ _id: id, createdBy: req.myUser._id });
    if (!blog) return res.status(404).json({ success: false, message: "no blog found" });

    blog.title = title || blog.title;
    blog.description = description || blog.description;
    await blog.save();
    res.status(200).json({
      success: true,
      message: "blog updated successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong while updating a blog",
      //   errorObject: error,
      errMessage: error.message,
    });
  }
};

//! delete a blog
const deleteBlog = async (req, res) => {
  try {
    let { id } = req.params;
    let blog = await blogCollection.findOne({ _id: id, createdBy: req.myUser._id });

    if (!blog) return res.status(404).json({ success: false, message: "no blog found" });

    let deletedBlog = await blogCollection.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "blog deleted successfully",
      deletedBlog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong while deleting a blog",
      //   errorObject: error,
      errMessage: error.message,
    });
  }
};

module.exports = {
  createBlog,
  fetchAllBlogs,
  fetchOneBlog,
  updateBlog,
  deleteBlog,
};

// express - async - handler;

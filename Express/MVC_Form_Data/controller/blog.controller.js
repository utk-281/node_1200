//! import the collection
const blogCollection = require("../models/blogs.model");

//! insert a blog
const createBlog = async (req, res) => {
  //! user details
  try {
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong while creating a blog",
      //   errorObject: error,
      errMessage: error.message,
    });
  }
};

//! fetching all blogs
const fetchAllBlogs = async (req, res) => {
  try {
    let blogs = await blogCollection.find({ createdBy: req.myUser._id });
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
    let { title, description } = req.body;
    let blog = await blogCollection.findOne({ _id: id });
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
    let blog = await blogCollection.findOne({ _id: id });
    await blog.remove();
    res.status(200).json({
      success: true,
      message: "blog deleted successfully",
      blog,
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

//! 1) destructure Router from express
//! 2) call the top level function
//! 3) export it.

const { Router } = require("express");

const {
  createBlog,
  fetchAllBlogs,
  fetchOneBlog,
  updateBlog,
  deleteBlog,
} = require("../controller/blog.controller");
const { authenticate } = require("../middlewares/authenticate.middleware");

const router = Router();

router.post("/create", createBlog); //? injecting the middleware
//? router level middleware

router.get("/all-blogs", fetchAllBlogs);

router.get("/blog/:id", fetchOneBlog); // /:abc ==> params (parameter)

router.patch("/update/:id", updateBlog);

router.delete("/delete/:id", deleteBlog);

module.exports = router;

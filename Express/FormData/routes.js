//! 1) destructure Router component from express module
//! 2) invoke the top level function
//! 3) export the router variable

let { Router } = require("express");
const {
  displayHomePage,
  displayFormPage,
  displayAllUsers,
  displayCSSContents,
  handleFormSubmit,
} = require("./controller");

let router = Router();

router.get("/", displayHomePage);

router.get("/form", displayFormPage);

router.get("/users", displayAllUsers);

router.get("/styles", displayCSSContents);

router.post("/api", handleFormSubmit);

module.exports = router;

// http://localhost:9001/v1/users

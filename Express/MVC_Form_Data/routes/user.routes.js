//! 1) destructure Router from express
//! 2) call the top level function
//! 3) export it.

let { Router } = require("express");
const { addUser, fetchAllUsers } = require("../controller/user.controller");

let router = Router();

router.post("/add", addUser);

router.get("/all-users", fetchAllUsers);

module.exports = router;

// localhost:9000/v1/users/add
//& ==> /add ==> endpoint from routes file
//& ==>  /v1/users ==> api versioning from main file

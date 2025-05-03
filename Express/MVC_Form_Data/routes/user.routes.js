//! 1) destructure Router from express
//! 2) call the top level function
//! 3) export it.

let { Router } = require("express");
const {
  addUser,
  fetchAllUsers,
  fetchOneUser,
  updateUser,
  deleteUser,
  login,
  logout,
} = require("../controller/user.controller");

let router = Router();

router.post("/add", addUser);

router.get("/all-users", fetchAllUsers);

router.get("/user/:id", fetchOneUser); // /:abc ==> params (parameter)

router.patch("/update-user/:id", updateUser);

router.delete("/delete/:id", deleteUser);

router.post("/login", login);

router.get("/logout", logout);

module.exports = router;

// localhost:9000/v1/users/add
//& ==> /add ==> endpoint from routes file
//& ==>  /v1/users ==> api versioning from main file

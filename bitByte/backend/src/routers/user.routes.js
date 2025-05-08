const { Router } = require("express");
const { registerUser } = require("../controllers/user.controller");
// const userController = require("../controllers/user.controller");

const router = Router();

router.post("/register", registerUser);

module.exports = router;

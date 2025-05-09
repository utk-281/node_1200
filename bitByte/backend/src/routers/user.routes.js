const { Router } = require("express");
const { registerUser, loginUser, logoutUser } = require("../controllers/user.controller");
const { authenticate } = require("../middlewares/authenticate.middleware");
// const userController = require("../controllers/user.controller");

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", authenticate, logoutUser);

module.exports = router;

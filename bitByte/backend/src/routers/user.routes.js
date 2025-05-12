const { Router } = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  deleteUserProfile,
  getLoggedInUserProfile,
  updateUserProfile,
} = require("../controllers/user.controller");
const { authenticate } = require("../middlewares/authenticate.middleware");
// const userController = require("../controllers/user.controller");

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", authenticate, logoutUser);

router.delete("/delete-me", authenticate, deleteUserProfile);
router.get("/me", authenticate, getLoggedInUserProfile);

router.patch("/update-me", authenticate, updateUserProfile); //& partial modification
router.put("/update-me", authenticate, updateUserProfile);

module.exports = router;

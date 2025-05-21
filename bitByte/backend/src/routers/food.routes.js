const { Router } = require("express");
const {
  addFood,
  getFoods,
  getSingleFood,
  deleteFood,
  updateFoodImage,
} = require("../controllers/food.controller");

const { upload } = require("../middlewares/multer.middleware");
const router = Router();

router.post("/add-food", upload.single("image"), addFood);

router.get("/all-foods", getFoods);

router.get("/food/:id", getSingleFood);

router.delete("/food/:id", deleteFood);

router.patch("/update-image/:id", upload.single("image"), updateFoodImage);

module.exports = router;

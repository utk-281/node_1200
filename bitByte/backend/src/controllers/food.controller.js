const foodCollection = require("../models/food.model");
const { uploadImageOnCloudinary, deleteImageFromCloudinary } = require("../utils/cloudinary.utils");
const ErrorHandler = require("../utils/ErrorHandler");
const asyncHandler = require("express-async-handler");

exports.addFood = async (req, res) => {
  // console.log(req.file);

  const { name, description, price, category } = req.body;
  const localFilePath = req?.file?.path;
  console.log(req.file);

  let uploadedResponse = await uploadImageOnCloudinary(localFilePath);
  console.log(uploadedResponse);

  let newFood = await foodCollection.create({
    name,
    description,
    price,
    category,
    image: [
      {
        secure_url: uploadedResponse?.secure_url,
        asset_id: uploadedResponse?.asset_id,
        public_id: uploadedResponse?.public_id,
      },
    ],
  });
  res.json({
    success: true,
    message: "food added successfully",
    data: newFood,
  });
};

exports.updateFoodDetails = asyncHandler(async (req, res) => {
  let { name, price, category, description } = req.body;
  let updateFood = await foodCollection.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      price,
      category,
    },
    {
      new: true,
    }
  );
  if (!updateFood) throw new ErrorHandler("food not found", 404);
  res.json({
    success: true,
    message: "food updated successfully",
    data: updateFood,
  });
});

exports.updateFoodImage = asyncHandler(async (req, res) => {
  let { id } = req.params;
  let food = await foodCollection.findById(id);
  let public_id = food?.image[0]?.public_id;
  if (public_id !== undefined || public_id !== null) {
    let deletedImage = await deleteImageFromCloudinary(public_id);
  }
  let localFilePath = req?.file?.path;
  let uploadedResponse = await uploadImageOnCloudinary(localFilePath);
  food.image = [
    {
      secure_url: uploadedResponse.secure_url,
      asset_id: uploadedResponse.asset_id,
      public_id: uploadedResponse.public_id,
    },
  ];
  await food.save();
  res.json({
    success: true,
    message: "food image updated successfully",
    data: food,
  });
});

exports.deleteFood = asyncHandler(async (req, res) => {
  let { id } = req.params;
  let food = await foodCollection.findOne({ _id: id });
  let public_id = food.image[0].public_id;
  console.log(public_id);
  let deleteImage = await deleteImageFromCloudinary(public_id);
  let deletedFood = await foodCollection.findByIdAndDelete(id);
  res.json({
    success: true,
    message: "food deleted successfully",
    data: deletedFood,
  });
});

exports.getFoods = asyncHandler(async (req, res) => {
  let foods = await foodCollection.find();
  if (foods.length === 0) throw new ErrorHandler("no food found", 404);
  res.json({
    success: true,
    message: "foods fetched successfully",
    count: foods.length,
    data: foods,
  });
});

exports.getSingleFood = asyncHandler(async (req, res) => {
  let { id } = req.params;
  let food = await foodCollection.findById(id);
  if (!food) throw new ErrorHandler("food not found", 404);
  res.json({
    success: true,
    message: "food fetched successfully",
    data: food,
  });
});

// let str =
//   "https://res.cloudinary.com/dmqwvd39n/image/upload/v1747379125/bitByte/ulw7h38a5qch3rrpkmvg.jpg";

/*
[
  {
    fieldname: 'image',
    originalname: 'maggie.jpeg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    destination: 'path',
    filename: '1747637952497----maggie.jpeg',
    path: 'path\\1747637952497----maggie.jpeg',
    size: 13522
  },
  {
    fieldname: 'image',
    originalname: 'download.jpeg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    destination: 'path',
    filename: '1747637952498----download.jpeg',
    path: 'path\\1747637952498----download.jpeg',
    size: 10636
  }
]
*/

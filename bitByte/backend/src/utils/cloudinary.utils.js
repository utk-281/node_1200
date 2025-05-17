const asyncHandler = require("express-async-handler");
const { v2 } = require("../config/cloudinary");
const fs = require("fs");

const uploadImageOnCloudinary = asyncHandler(async (path) => {
  if (!path) return null;
  let uploadedResponse = await v2.uploader.upload(path, {
    folder: "bitByte",
  });
  console.log(path);
  let deleted = fs.unlinkSync(path);
  console.log(deleted);
  return uploadedResponse;
});

const deleteImageFromCloudinary = asyncHandler(async (id) => {
  if (id === null || id === undefined) return null;
  let result = await v2.uploader.destroy(id);
  return result;
});

module.exports = { uploadImageOnCloudinary, deleteImageFromCloudinary };

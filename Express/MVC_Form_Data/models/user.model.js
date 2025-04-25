//! 1) import mongoose library.
//! 2) define a schema/structure.
//! 3) create a model(collection) and export it.

//! 1)
const mongoose = require("mongoose");

//! 2) to create a schema, we need a object of Schema class.
let userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // --> without this field, data will not get stored
    },
    email: {
      type: String,
      required: true,
      unique: true, // --> this ensures no duplicates are allowed
    },
    password: {
      type: String,
      required: [true, "Password is required and min length 5"],
    },
    phone: {
      type: Number,
    },
  },
  {
    timestamps: true, // createdAt and updatedAt
  }
);

//! 3) with the help of model(), we are creating a collection based on the structure
module.exports = mongoose.model("User", userSchema);
//& collection_name ==> users (plural+lowercase)

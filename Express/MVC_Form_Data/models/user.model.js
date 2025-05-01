//! 1) import mongoose library.
//! 2) define a schema/structure.
//! 3) create a model(collection) and export it.

//! 1)
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

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

//! pre-hook ==> pre means before something => before saving data (any new resource is created)
//! THIS IS ONE WAY HASHING WHICH MEANS IT CANNOT BE DECRYPTED
userSchema.pre("save", async function () {
  //& this will generate a salt of length 10
  let salt = await bcryptjs.genSalt(10);
  //& hash the password
  let hashedPassword = await bcryptjs.hash(this.password, salt);
  //& assigning the hashed password
  this.password = hashedPassword;
});

//! creating a method to compare password, with the help of "methods"
//& syntax ==> anySchema.methods.method_name
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
  // let isMatch = { name: "abc", password: hashedPassword }.comparePassword("1234");
  // console.log(isMatch);
};

//! 3) with the help of model(), we are creating a collection based on the structure
module.exports = mongoose.model("User", userSchema);
//& collection_name ==> users (plural+lowercase)

const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "email is required"],
      minlength: [7, "minimum length should be 7"],
    },
    cartData: {
      type: Object,
      default: {},
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

//! password hashing --> pre hook
userSchema.pre("save", async function () {
  let salt = await bcryptjs.genSalt(12); // random string
  let hashedPassword = await bcryptjs.hash(this.password, salt);
  this.password = hashedPassword;
});

//! method to compare the password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);

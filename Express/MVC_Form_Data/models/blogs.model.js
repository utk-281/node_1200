//! 1) import mongoose module
//! 2) create a schema.
//! 3) create a collection and export it.

const { Schema, model } = require("mongoose");

let blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      minlength: 10,
      required: [true, "Description is required and should of minimum 10 characters"],
    },
    // createdBy: {}, //TODO
  },
  { timestamps: true }
);

module.exports = model("Blog", blogSchema);

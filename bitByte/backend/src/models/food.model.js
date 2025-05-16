const monogoose = require("mongoose");

const foodSchema = new monogoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      minlength: [10, "minimum length should be 10"],
    },
    price: {
      type: Number,
      required: true,
    },
    image: [
      {
        secure_url: {
          type: String,
        },
        asset_id: {
          type: String,
        },
        public_id: {
          type: String,
        },
      },
    ],
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = monogoose.model("Food", foodSchema);

// https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fimage&psig=AOvVaw23zzwJ_Lo6SOgDWWFngndh&ust=1747208361078000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOD14sH4n40DFQAAAAAdAAAAABAE

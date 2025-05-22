const orderCollection = require("../models/order.model");
const userCollection = require("../models/user.model");
const foodCollection = require("../models/food.model");
const asyncHandler = require("express-async-handler");

const placeOrder = asyncHandler(async (req, res) => {
  //! current logged in user
  const currentUser = req.myUser;
  //   console.log(currentUser);
  //! get the cart details of current logged in user
  const cartData = currentUser.cartData;
  //! address of the current logged in user
  const { address } = req.body;
  //   console.log(req.body);

  //! extracting the keys from cart data into an array
  let foodIds = Object.keys(cartData);
  //   console.log(foodIds);
  //! using that array, finding all the food items
  let foodItems = await foodCollection.find({ _id: { $in: foodIds } });
  //   console.log(foodItems);
  console.log(cartData);

  let items = [];
  let total = 0;

  for (let foodItem of foodItems) {
    // console.log(foodItem);
    let quantity = cartData[foodItem._id];
    let price = foodItem.price;
    let itemPrice = quantity * price;

    total += itemPrice;

    items.push({
      food: foodItem.name,
      quantity: quantity,
      price: itemPrice,
      //   total,
    });
    // console.log(items);
  }
  console.log(items);
});

module.exports = {
  placeOrder,
};

let emp = {
  name: "abc",
  2345678987654: "def",
};
emp[3456789765];

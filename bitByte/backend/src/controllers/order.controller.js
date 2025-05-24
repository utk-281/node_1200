const orderCollection = require("../models/order.model");
const userCollection = require("../models/user.model");
const foodCollection = require("../models/food.model");
const asyncHandler = require("express-async-handler");
const { Stripe } = require("stripe");
const ErrorHandler = require("../utils/ErrorHandler");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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
  console.log(foodItems);

  let items = [];
  let total = 0;

  for (let foodItem of foodItems) {
    // console.log(foodItem);
    let quantity = cartData[foodItem._id];
    let price = parseInt(foodItem.price);
    let itemPrice = parseInt(price * quantity);

    total += itemPrice;

    items.push({
      food: foodItem.name,
      quantity: quantity,
      price: itemPrice,
      //   total,
    });
    // console.log(items);
  }
  const newOrder = await orderCollection.create({
    userId: currentUser._id,
    items: items,
    amount: parseInt(total),
    address: address,
  });

  const line_items = items.map((item) => {
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: item.food,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
  });

  console.log(line_items);

  const session = await stripe.checkout.sessions.create({
    line_items,
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `http://localhost:9000/orders/v1/verify-order?orderId=${newOrder._id}&success=true`,
    cancel_url: `http://localhost:9000/orders/v1/verify-order?orderId=${newOrder._id}&success=false`,
  });

  console.log(session);

  //! clear the cart

  await userCollection.findByIdAndUpdate(currentUser._id, { cartData: {} });

  res.status(200).json({
    success: true,
    message: "order placed successfully",
    sessionId: session.id,
    url: session.url,
  });
});

const verifyOrder = asyncHandler(async (req, res) => {
  // console.log(req.query);
  let orderId = req.query.orderId;
  let flag = req.query.success;
  // console.log(typeof flag);

  let order = await orderCollection.findById(orderId);
  // console.log(order);

  if (flag == "true") {
    console.log("inside if");
    order.payment = true;
    order.status = "processing";
    await order.save();
    return res.status(200).json({
      success: true,
      message: "order placed successfully",
    });
  } else {
    console.log("inside else ");
    order.payment = false;
    order.status = "canceled";
    await order.save();
    return res.status(402).json({
      success: true,
      message: "payment failed",
    });
  }
});

const getOrders = asyncHandler(async (req, res) => {
  let currentUserId = req.myUser._id;
  let orders = await orderCollection.find({ userId: currentUserId });
  if (orders.length === 0) throw new ErrorHandler("no orders found", 404);
  res.status(200).json({
    success: true,
    message: "orders fetched successfully",
    count: orders.length,
    data: orders,
  });
});

//! functionalities for admin
//? update the order status
//? get all the orders

module.exports = {
  placeOrder,
  verifyOrder,
  getOrders,
};

/*
req.query =  {
  orderId: '68317007987053e662fbc088',
  success: 'true'
}
*/

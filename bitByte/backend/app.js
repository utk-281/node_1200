const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const userRoutes = require("./src/routers/user.routes");
const foodRoutes = require("./src/routers/food.routes");
const cartRoutes = require("./src/routers/cart.routes");

const error = require("./src/middlewares/error.middleware");

const app = express();

// let data = app.use(express.static("src/uploads/temp"));
// static() --> it is used to server static files(html, css, images, js, etc...)
//! middleware section
// app.use(express.static("src/uploads/temp"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/users/v1", userRoutes);
app.use("/foods/v1", foodRoutes);
app.use("/cart/v1", cartRoutes);

//! error middleware ==> use it at last
app.use(error);

module.exports = app;

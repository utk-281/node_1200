const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const userRoutes = require("./src/routers/user.routes");
const foodRoutes = require("./src/routers/food.routes");

const error = require("./src/middlewares/error.middleware");

const app = express();

//! middleware section
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/users/v1", userRoutes);
app.use("/foods/v1", foodRoutes);

//! error middleware
app.use(error);

module.exports = app;

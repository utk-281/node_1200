const express = require("express");
require("dotenv").config();

const userRoutes = require("./src/routers/user.routes");
const error = require("./src/middlewares/error.middleware");
const cookieParser = require("cookie-parser");

const app = express();

//! middleware section
app.use(express.json());
app.use(cookieParser());

app.use("/users/v1", userRoutes);

//! error middleware
app.use(error);

module.exports = app;

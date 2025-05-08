const express = require("express");
require("dotenv").config();

const userRoutes = require("./src/routers/user.routes");

const app = express();

//! middleware section
app.use(express.json());

app.use("/users/v1", userRoutes);

module.exports = app;

//? mongoose => it is an ODM(object data modelling) library for mongodb and nodeJS, it simplifies the process of working with mongodb by providing functionalities like
//& schema --> we define the structure of the document,
//& data validation --> data is checked against schema,
//& CRUD operations --> create, read, update, delete (newer ones)

//! ODM ==> object data modelling. it is tool that brides the gap between your code(object oriented--> (JS OBJECTS)) to document based data(BSON). it converts javascript object to mongodb document and vice versa.

const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
//! require("dotenv") ==> this will read the .env file and load all the variables to process.env(environment variables)
//? config() ==> this will parse the .env file

// console.log(process.env);

const { connectDB } = require("./config/database");

const userRoutes = require("./routes/user.routes");
const blogRoutes = require("./routes/blog.routes");
const error = require("./middlewares/error.middleware");
const { authenticate } = require("./middlewares/authenticate.middleware");

connectDB();

const app = express();

app.use(express.urlencoded({ extended: true })); // this will parse html form data
app.use(express.json()); // this will parse json data
app.use(cookieParser()); // this will parse cookie data and will give some utilities to interact with cookies

app.use("/v1/users", userRoutes);
app.use("/v1/blogs", authenticate, blogRoutes);
//& "/v1/users" ==> api versioning
//! http://localhost:9000/v1/users/add

app.use(error);

app.listen(process.env.PORT, (err) => {
  if (err) console.log(err);
  console.log("server running at port 9000");
});

//!  thunderClient

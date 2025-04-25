//? mongoose => it is an ODM(object data modelling) library for mongodb and nodeJS, it simplifies the process of working with mongodb by providing functionalities like
//& schema --> we define the structure of the document,
//& data validation --> data is checked against schema,
//& CRUD operations --> create, read, update, delete (newer ones)

//! ODM ==> object data modelling. it is tool that brides the gap between your code(object oriented--> (JS OBJECTS)) to document based data(BSON). it converts javascript object to mongodb document and vice versa.

const express = require("express");
const { connectDB } = require("./config/database");

const userRoutes = require("./routes/user.routes");

connectDB();

const app = express();

app.use(express.urlencoded({ extended: true })); // this will parse html form data
app.use(express.json()); // this will parse json data

app.use("/v1/users", userRoutes);
//& "/v1/users" ==> api versioning
//! http://localhost:9000/v1/users/add

app.listen(9000, (err) => {
  if (err) console.log(err);
  console.log("server running at port 9000");
});

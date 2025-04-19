let express = require("express");

let app = express();

//! middleware ==>
app.use((req, res, next) => {
  console.log("this is some function");
  console.log("this is middleware 1");
  req.userId = "123456";
  next();
});

app.use((req, res, next) => {
  console.log("this is middleware 2");
  req.lastName = "def";
  next();
});

app.get("/", (req, res) => {
  console.log(req.lastName);
  console.log(req.userId);
  // res.send("home page");
  res.send("image", "caption");
});

app.get("/about", (req, res) => {
  res.send("about page");
});

app.listen(9000, (err) => {
  if (err) console.log(err);
  console.log("server running.....");
});

//! 5 types of middleware
//? 1) BUILT-IN MIDDLEWARE -->
//? 2) USER-DEFINED MIDDLEWARE -->
//? 3) ERROR MIDDLEWARE
//? 4) ROUTER LEVEL MIDDLEWARE
//? 5) APP LEVEL MIDDLEWARE

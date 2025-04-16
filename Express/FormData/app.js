let express = require("express");
let fs = require("fs");

let app = express();

//! to be discussed
app.use(express.urlencoded({ extended: true }));

//! create on endpoint ("/form") where a form page will be displayed with there input --> name, email, password

app.get("/", (req, res) => {
  res.send("home page");
});

app.get("/form", (req, res) => {
  //   res.send("form page");
  fs.createReadStream("./Pages/form.html", "utf-8").pipe(res);
});

app.post("/api", (req, res) => {
  //! set form action to a value, and use the same value as the endpoint oin the post method
  //! set form method to post
  //! use name attribute
  //? data is stored in req.body
  console.log(req.body);
});

/*
req.body = {
  userName: 'utkarsh',
  userEmail: 'abc@gmail.com',
  userPassword: '1234'
}
*/

app.listen(9001, (err) => {
  if (err) console.log(err);
  console.log("server running at 9001");
});

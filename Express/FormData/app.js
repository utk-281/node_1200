let express = require("express");
let fs = require("fs");
const { MongoClient } = require("mongodb");

let connectDB = async () => {
  //! create a connection
  let client = await MongoClient.connect("mongodb://localhost:27017");
  //! create a database
  let database = client.db("formdata");
  //! create a collection
  let collection = await database.createCollection("users");

  return collection;
};

let app = express();

app.use(express.urlencoded({ extended: true }));
//! create on endpoint ("/form") where a form page will be displayed with there input --> name, email, password

app.get("/", (req, res) => {
  res.send("home page");
});

app.get("/form", (req, res) => {
  //   res.send("form page");
  fs.createReadStream("./Pages/form.html", "utf-8").pipe(res);
});

app.get("/users", async (req, res) => {
  let collection = await connectDB();
  let data = await collection.find().toArray();
  res.json(data);
});

app.get("/styles", (req, res) => {
  fs.createReadStream("./Pages/styles.css", "utf-8").pipe(res);
});

app.post("/api", async (req, res) => {
  //! set form action to a value, and use the same value as the endpoint in the post method
  //! set form method to post
  //! use name attribute
  //? data is stored in req.body
  console.log(req.body);

  let myCollection = await connectDB();
  // console.log(myCollection);
  let { userEmail, userName, userPassword } = req.body;
  let dataInserted = await myCollection.insertOne({ userEmail, userName, userPassword }); //{}
  console.log(dataInserted);

  res.send(
    `<h3>${req.body.userName}</h3> has signed up successfully with the email <h3>${req.body.userEmail}</h3>`
  );
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

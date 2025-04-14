//! npm ==> it stands for node package manager. (modules and packages both are same). it is an online platform which is used to manage the packages(install, update, remove, create).
// ? using this npm, we can install, update and remove the modules. we can also create new modules

//! before installing any third party module, there must be "package.json" file int the source/project folder
//? to create a package.json file type this command ==> "npm init -y" in the terminal.
//! package.json file contains the meta data of the project like (name, author ,description, license, dependencies, devDependencies, etc..).

//! now we can install third party modules by using the command ==>
//? npm i/install <module_name_1 module_name_2 module_name_3..........>
//? example ==> npm i mongodb
//? example ==> npm i express mongodb multer

//! import the installed modules

const monogdb = require("mongodb");
const { MongoClient } = require("mongodb");
// console.log(monogdb.MongoClient);

// monogdb.MongoClient.connect("mongodb://localhost:27017");
// let payload = MongoClient.connect("mongodb://localhost:27017");
// console.log(payload);

let connectDB = async () => {
  //! 1) creating a connection with mongodb
  let client = await MongoClient.connect("mongodb://localhost:27017");
  //   console.log(payload.db);

  //! 2) creating a database --> db("database-name")
  let database = client.db("NodeJS");
  //   console.log(database.createCollection);

  //! 3) creating a collection --> createCollection("collection-name")
  let collection = await database.createCollection("nodeJsCollection");
  //   console.log(collection.insertOne);
  let data = { name: "abc", id: 123, age: 34 };
  let op = await collection.insertOne(data);
  await collection.insertOne({ name: "def", age: 35, id: 234 });
  console.log("data inserted");
};
connectDB();

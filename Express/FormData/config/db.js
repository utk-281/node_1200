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

module.exports = { connectDB };

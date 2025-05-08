const app = require("./app");
const { connectDB } = require("./src/config/database");

connectDB()
  .then(() => {
    app.listen(process.env.PORT, (err) => {
      if (err) console.log("error while starting the server....");
      console.log("server running.....");
    });
  })
  .catch((err) => {
    console.log("error occurred while connecting to database");
    console.log(err);
    process.exit(1); // if any error occurs, then exit the application
  });
//! default command ==> npm command_name
//! user defined command ==> npm run command_name

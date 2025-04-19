let express = require("express");

//! for every routes file, import the file here and use it in middleware and use this in a middleware
const myRoutes = require("./routes");

let app = express();

//! middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/xyz", myRoutes);

app.listen(9001, (err) => {
  if (err) console.log(err);
  console.log("server running at 9001");
});

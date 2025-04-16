//! frameworks ==> is is a collection of libraries(for now).
//! difference between frameworks and libraries

//! nodeJS frameworks --> expressJS, sailsJs, meteorJs, DerbyJs

//! mern ==> nextJS, nest/angular, express (popular)
// nextJS --> frontend/backend, nestJS/angular--> frontend, expressJS --> backend

//? express ==> it is a framework for nodejs through which we can build server
//? side applications (which are scalable)

//! 1) we should have a package.json file in our root project, and there should be only one package.json file in our project
//! ==> to create a package.json file, command
//? npm init -y --> it will create a package.json file in our root project with the default values.
//? npm init (npm initialize) --> this will create a package.json file in our root project with the user defined values.

//! it stores project details like name, version, description, author along with dependencies(production and development)
//? we have production and development dependencies

//! 2) install required packages/modules
//? npm i/install module_name
//? npm i module_name1 module_name2 ..........

//! 3) import the installed modules.
let express = require("express");
// console.log(express);

//! calling/invoking top level function
let app = express();
// console.log(app);

//! routing
//? "/" ==> route
app.get("/", (req, res) => {
  res.send("hello world!!!!!!");
});
//? about page
app.get("/about", (req, res) => {
  res.send("about page");
});

// app.post("/endpoint", cb);
// app.put("/endpoint", cb);
// app.patch("/endpoint", cb);
// app.delete("/endpoint", cb);

//! assign a port number
app.listen(9000, (err) => {
  if (err) console.log(err);
  console.log("server running on port 9000!!!!");
});
//!  nodemon --> it will automatically restart our server if we make any changes
//? npm i nodemon --D (this will be installed in devDependencies --> which means it will not be installed in production)
//? nodemon filename.js

//! .ps1 error
// the term nodemon not found ==> npm i nodemon -g

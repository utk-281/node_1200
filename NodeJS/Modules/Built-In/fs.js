// let fs = require("fs");
let fs = require("node:fs");
// console.log(fs);

//! ==================== blocking or synchronous execution================
//! 1) creating a file
//? method name == writeFileSync()
//? format == writeFileSync("path/filename", "data")

// console.log("Start");

// fs.writeFileSync("./data1.txt", "");
// console.log("file created");

// console.log("middle");
// console.log("end");

//! if file is not present at the given path with the given name then a new file will be created wth the given data,
//! if file is already present, old data will be over-written by the new data

//! 2) reading/fetching a file
//? method == readFileSync()
//? format == readFileSync("path", "encoding")

// console.log("Start");

// let data = fs.readFileSync("./data.txt");
// console.log(data);
/* <Buffer 74 68 69 73 20 69 73 20 73 65 6
3 6f 6e 64 20 73 74 61 74 65 6d 65 6e 7
4> --> it is an array of binary numbers (displayed in hexadecimal) */
// console.log(data.toString()); //? to convert buffer value to array we use toString()
//? encoding  ==> in which format we want to display the data

// let data = fs.readFileSync("./data.txt", "utf-8");
// console.log(data);

// console.log("middle");
// console.log("end");

//! copy the contents of "fs.js" to a new file "app.js"

// let contents = fs.readFileSync("./fs.js", "utf-8");
// fs.writeFileSync("./app.js", contents);

//! 3) updating/appending a file(append ==> add at last)
//? method == appendFileSync()
//? format ==> appendFileSync("path", "data to be added")

// console.log("start");

// fs.appendFileSync("./demo.java", "new data\n");
//? "/" ==> only forward slash means root folder ==> path module

// console.log("middle");
// console.log("end");

//! if the file is present it will append the data, if not the a new file will be created

//! 4) deleting a file
//? method name ==> unlinkSync()
//? format ==> unlinkSync("path")

// fs.unlinkSync("../User-Defined/delete.py");
// console.log("file deleted");

//! 5) creating a folder/directory
//? method name ==> mkdirSync()
//? format ==> mkdirSync("path/folder-name")

// fs.mkdirSync("./nestedFolder");
// console.log("folder created");

//! create a folder structure in the current directory like this ==>
//? ==> backend/controller/user.controller.js

// fs.mkdirSync("./backend");
// fs.mkdirSync("./backend/controller");
// fs.writeFileSync("./backend/controller/user.controller.js", "");

//! 6) to delete a folder
//? method name ==> rmdirSync()
//? format ==> rmdirSyn("path")

// fs.rmdirSync("./nested");
// console.log("folder deleted");

// fs.rmdirSync("./backend", { recursive: true });

//! async execution
// fs.rm("./backend", { recursive: true }, (err) => {
//   console.log("folder deleted");
// }); // --> //asyncFunction

//! backend/controller/user.controller.js ==> delete this structure
// fs.unlinkSync("./backend/controller/user.controller.js");
// fs.rmdirSync("./backend/controller");
// fs.rmdirSync("./backend");

//! 7) renaming a folder/file
//? method name ==> renameSync()
//? format ==> renameSync("old-folder/file-name", "new-folder/file-name")

fs.renameSync("./index.txt", "../data.js");
// fs.renameSync("./python", "./java");

// https://github.com/utk-281/node_1200

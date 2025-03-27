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

console.log("Start");

// let data = fs.readFileSync("./data.txt");
// console.log(data);
/* <Buffer 74 68 69 73 20 69 73 20 73 65 6
3 6f 6e 64 20 73 74 61 74 65 6d 65 6e 7
4> --> it is an array of binary numbers (displayed in hexadecimal) */
// console.log(data.toString()); //? to convert buffer value to array we use toString()
//? encoding  ==> in which format we want to display the data

let data = fs.readFileSync("./data.txt", "utf-8");
console.log(data);

console.log("middle");
console.log("end");

//! copy the contents of "fs.js" to a new file "app.js"

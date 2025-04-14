// path module ==> it provides function to work on folder/file path
let path = require("path");
// console.log(path);

//! global variables
// console.log(__filename);
//? C:/Users\utkar\Desktop\Classes\Node1200\NodeJS\Modules\Built-In\path.js --> absolute path
// console.log(__dirname);
//? C:\Users\utkar\Desktop\Classes\Node1200\NodeJS\Modules\Built-In --> absolute path

//! 1) basename() --> IT WILL RETURN THE LAST PART OF THE ABSOLUTE PATH
// console.log("1 " + path.basename(__filename));
// console.log("2 " + path.basename(__dirname));
// console.log("3 " + path.basename(`E:/NODE/EXPRESS/myFile.txt`));
// console.log("4 " + path.basename(`E:/NODE/EXPRESS`));

//! 2) extname() --> this will return the extension of the file, in case of folder it will return ""
// console.log(path.extname(__filename));
// console.log(path.extname(__dirname));
// console.log(path.extname("E:/NODE/EXPRESS/myFile.txt"));
// console.log(path.extname("E:/NODE/EXPRESS"));

//! 3) parse() --> this will parse the string path to object
// console.log(path.parse(__filename));
// console.log(path.parse(__dirname));
// console.log(path.parse("E:/NODE/EXPRESS/myFile.txt"));

//! 4) format() --> this will convert the path object to string.
let pathObject = {
  root: "E:/",
  dir: "E:/NODE/EXPRESS",
  base: "myFile.txt",
  ext: ".txt",
  name: "myFile",
};
// console.log(path.format(pathObject));

//! 5) join() ==> it is used to join the given path
console.log(path.join("/folder1", "/folder2", "/myFile.txt"));
// \folder1\folder2\myFile.txt
console.log(path.join(__dirname + "/react.js"));

// let fs = require("fs");
// let fs = require("node:fs");
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

// try {
//   fs.rmdirSync("./nested");
//   console.log("folder deleted");
// } catch (error) {
//   console.log("error while deleting a folder");
//   console.log(error);
// }

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

// fs.renameSync("./index.txt", "../data.js");
// fs.renameSync("./python", "./java");

// https://github.com/utk-281/node_1200

//! ===================================asynchronous execution========
//! using callbacks ===================

//!1) creating a file asynchronously
//? method name ==> writeFile()
//? format ==> writeFile("path/filename", "data to be inserted", cb)

//? call stack ==> main thread
// console.log("Start");

//! callback first error ==> we pass the first argument as error, to handle it
// fs.writeFile("./demo.txt", "\n this is second line", (err) => {
//   if (err) console.log(err);
//   console.log("file created");
// }); //! this is not executed by main thread //todo-->

// console.log("middle");
// console.log("end");

//! if the file is already present then it will over-write the data, otherwise a new file will be created

//! 2) reading a file
//? method name ==> readFile()
//? format ==> readFile("path", "encoding", cb)

// console.log("Start");

// fs.readFile("./demo1.txt", "utf-8", (err, data) => {
//   if (err) console.log("err from callback: " + err);
//   console.log("file read");
//   console.log(data);
// });

// console.log("middle");
// console.log("end");

//! copy the contents of "fs.js" to "data.txt"
// fs.readFile("./fs.js", "utf-8", (err, data) => {
//   if (err) console.log(err);
//   fs.writeFile("./data.txt", data, (err) => {
//     if (err) console.log(err);
//     console.log("file created");
//   });
// });

//!3) updating/appending a file
//? method name ==> appendFile()
//? format ==> appendFile("path", "new data", cb)

// fs.appendFile("./demo.txt", `\n\t"second" line`, (err) => {
//   if (err) console.log(err);
//   console.log("file updated");
// });

// string literals ==> ``

//!4) deleting a file
//? method name ==> unlink()
//? format ==> unlink("path", cb)

// fs.unlink("./demo.txt", (err) => {
//   if (err) console.log(err);
//   console.log("file deleted");
// });

//!5) creating a folder
// fs.mkdir("/folder1", (err) => {
//   if (err) console.log(err);
//   console.log("folder created");
// });

//!6) removing a folder
// fs.rmdir("./folder1", (err) => {
//   if (err) console.log(err);
//   console.log("folder deleted");
// });

//! Node/backend/routes/userRoutes.js --> callback hell/pyramid of doom
//! Node/backend/routes/userRoutes.js --> callback hell/pyramid of doom (delete)

// fs.mkdir("./Node", (err) => {
//   if (err) console.log(err);
//   console.log("Node folder created");
//   fs.mkdir("./Node/backend", (err) => {
//     if (err) console.log(err);
//     console.log("backend folder created");
//     fs.mkdir("./Node/backend/routes", (err) => {
//       if (err) console.log(err);
//       console.log("]routes folder created");
//       fs.writeFile("./Node/backend/routes/userRoutes.js", "data", (err) => {
//         if (err) console.log(err);
//         console.log("file created");
//       });
//     });
//   });
// });

//!7) renaming a file/folder
//? method name ==> rename()
//? format==> rename("old-folder/file-name", "new-folder/file-name", cb)
// fs.rename("./Demo", "./UpdatedDemo", (err) => {
//   if (err) console.log(err);
//   console.log("folder renamed");
// });

//! ========================== using then/catch==============
// let fs = require("fs/promises");
let fs = require("fs").promises;
//? operations performed using fs will return a promise

//! 1) creating a file
//? method name ==> writeFile()
//? format ==> writeFile().then().catch()

// console.log("start");
// let output = fs.writeFile("./data.txt", "data1");

// output
//   .then(() => {
//     console.log("file created");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// console.log("middle");
// console.log("end");

//! 2) reading  file

// let output = fs.readFile("./data.txt", "utf-8");
// // console.log(output);

// output
//   .then((data) => {
//     console.log("file read");
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//! 3) updating/appending a file

// let output = fs.appendFile("./data.txt", "\n this is second statement");

// output
//   .then(() => {
//     console.log("file updated");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//! copy the contents of "fs.js" into a new file "demo.txt"

// let readFile = fs.readFile("./fs.js", "utf-8");
// readFile
//   .then((data) => {
//     let writeFile = fs.writeFile("./demo.txt", data);
//     writeFile
//       .then(() => {
//         console.log("file copied");
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//! 4) deleting a file
//? unlink()

// let output = fs.unlink("./demo.txt");
// output
//   .then(() => {
//     console.log("file deleted");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//! 5) creating a folder
//? method name ==< mkdir()

// let output = fs.mkdir("./backend");
// output
//   .then(() => {
//     console.log("folder created");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//!6) deleting a folder

//! 7) rename a folder

//! node/backend/routes/userRoutes.js

// let node = fs.mkdir("./node");
// node
//   .then(() => {
//     console.log("node folder created");

//     let backend = fs.mkdir("./node/backend");
//     backend
//       .then(() => {
//         console.log("backend folder created");

//         let routes = fs.mkdir("./node/backend/routes");
//         routes.then(() => {
//           console.log("routes folder created");

//           let userRoutes = fs.writeFile("../node/backend/routes/userRoutes.js", "let a =20");
//         });
//         userRoutes
//           .then(() => {
//             console.log("file created");
//           })
//           .catch((err) => {
//             console.log(err);
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   })
//   .catch((err) => {
//     console.log(err);
//   });

async function createStr() {
  let node = await fs.mkdir("./node");
  let backend = await fs.mkdir("./node/backend");
  let routes = await fs.mkdir("./node/backend/routes");
  let file = await fs.writeFile("./node/backend/routes/routes.js", "data");
}

createStr();

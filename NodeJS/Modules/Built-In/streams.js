//! streams ==> sending data from source to destination in continuous chunks or pieces is called streaming`
// any one chunk will be called a stream

// in nodejs we have 4 types of streaming

//? 1) writeable stream ==> using this stream, we can write the data in continuous chunks

//? 2) readable stream ==>using this stream, we can read the data in continuous chunks

//? 3) duplex stream ==> we can perform both read and write simultaneously or at the same time

//? 4) transform stream ==> similar to duplex, but the data can be modified

//!1) ================================ writeable streams ====================== --> fs.createWriteStream()
let fs = require("fs");

//! emit() :--> it is used to generate custom events
//? syntax ==> emit("event-name", data)
//! on() :--> it is used to listen to custom events
//? syntax ==> on("event-name", ()=>{})

// let output = fs.createWriteStream("./streams.txt");
// console.log(output); --> WriteStream{}

// output.on("data", () => {
//   //! this is used for reading the contents
//   console.log("file created");
// });

// output.write("this is a message from writeable stream second line", (err) => {
//   if (err) console.log(err);
//   console.log("data written");
// });
//? callback --> callbacks are used to define a function to be called when a certain event occurs

//! 2) ================================ readable streams ====================== --> fs.createReadStream()

// let result = fs.createReadStream("./streams.txt", "utf-8");
// // console.log(result); // ReadStream{}

// result.on("data", (chunk) => {
//   console.log(chunk);
// });
//? chunks --> small pieces of large data

// let read = fs.createReadStream("./index.html", { highWaterMark: 100 });

// read.on("data", (chunk) => {
//   console.log(`chunk size -- ${chunk.length}\n${chunk}\n================================\n`);
// });

//! 3) ============================ duplex streams===================
let read = fs.createReadStream("./index.html", "utf-8");
let write = fs.createWriteStream("./streams.txt");
//? pipe() ==> this will connect source and destination
//syntax ==> source.pipe(destination)
read.pipe(write);

//! write a function that executes fs.readFileSync async
// hint ==> use async await

async function readFile() {
  let data = fs.readFileSync("./index.html", "utf-8");
  return data;
}

let op = readFile();
console.log(op);

console.log("start");
console.log("middle");

op.then((data) => {
  console.log(data);
}).catch((err) => {
  console.log(err);
});
console.log("end");

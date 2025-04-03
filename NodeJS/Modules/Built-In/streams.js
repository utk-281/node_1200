//! streams ==> sending data from source to destination in continuous chunks or pieces is called streaming
// any one chunk will be called a stream

// in nodejs we have 4 types of streaming

//? 1) writeable stream ==> using this stream, we can write the data in continuous chunks

//? 2) readable stream ==>using this stream, we can read the data in continuous chunks

//? 3) duplex stream ==> we can perform both read and write simultaneously or at the same time

//? 4) transform stream ==> similar to duplex, but the data can be modified

let fs = require("fs");

let read = fs.createReadStream("./Pages/index.html", { highWaterMark: 50 });

read.on("data", (chunks) => {
  console.log(`this is chunk 1 size --${chunks.length} and value is --- ${chunks}`);
});

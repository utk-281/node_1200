//! HTTP ( in general) ==> it is a protocol (set of rules) two or more devices communicate with each other

//! in nodeJS we have a built-in module called http, with the help of this module we can create a server

//! get(), post(), put(), patch(), delete()
//? get()         :--> it is used to fetch resources from the server
//? post()        :--> it is used to send data to the server
//? delete()      :--> it is used to delete resources from the database
//? put()/patch() :--> it is used to update the resources

//! status code ==> 5 series
//? 1XX ==> informational (100: continue, 101: switching protocols)
//? 2XX ==> Success (200: ok, 201: ok and created)
//? 3XX ==> Redirection (301: moved permanently )
//? 4XX ==> Client error (400: bad req, 401: unauthorized)
//? 5XX ==> Server error (500: internal server error)

// let http = require("http");
// let fs = require("fs");
// console.log(http);
//! steps to create a server
//? 1) import http module
//? 2) use createServer() (which accepts a callback function) to create a server
//? 3) assign a port number to the server (listen(PORT_NUMBER, CALLBACK_FUNCTION))

// let server = http.createServer((req, res) => {
//   res.end("Hello from server");
//? to display anything on the output --> write()
//   res.write("this is a message from write()");
//   res.write("this is after cycle is ended");
//   res.end(); // this will terminate the current request-response cycle
//   res.write("this is after cycle is ended"); // this will throw an error
// res.end("this is from end(), after displaying the message it will end the cycle");
// res.write("hello");
// res.end();
// console.log(req.url);
// console.log(req.method);
// console.log(req.query);
// console.log(req.host);
// console.log(res);
// res.writeHead(statusCode, "statusMessage", {"content-type":"value"}) --> headers set (res)
// res.setHeader("mynName", "utk"); //? for sending custom headers
// res.writeHead(202, "ok", { "Content-type": "text/plain" });
// res.end("hello");
//? content-type for html --> text/html
//? content-type for css --> text/css
//? content-type for json --> application/json
//? content-type for js --> application/js
// });

// server.listen(9001, (err) => {
//   if (err) console.log("error from callback first error" + err);
//   console.log("server running at port 9001");
// });

//! to tap into the server, open browser and type localhost:portNumber
//! to kill the server click on terminal and press ctrl + c
//! after every modifications we have to restart the server

//! create a server and display a html page on the UI
// create a html file
// create a server
// read the contents of html file
// send the contents of html as response

// let server = http.createServer((req, res) => {
//   //! ==============sending html file====================
//   // res.writeHead(200, "ok", { "Content-type": "text/plain" }); // --> this will display the message as string format
//   // res.writeHead(200, "ok", { "Content-type": "text/html" }); // --> this will the message as html file
//   // let contents = fs.readFileSync("./Pages/index.html", "utf-8");
//   // res.end(contents);

//   //! ==============sending css file====================
//   res.writeHead(200, "ok", { "Content-type": "text/css" });
//   fs.readFile("./Pages/styles.css", "utf-8", (err, data) => {
//     if (err) console.log(err);
//     res.end(data);
//   });
//   //! ==============sending json file====================
//   res.writeHead(200, "ok", { "Content-type": "application/json" });
//   fs.readFile("./Pages/data.json", "utf-8", (err, data) => {
//     if (err) console.log(err);
//     res.end(data);
//   });
// });

// server.listen(9000, (err) => {
//   if (err) console.log(err);
//   console.log("server running at port 9000");
// });

// http
//   .createServer((req, res) => {
//     //! sending html file using streams
//     // res.writeHead(200, "ok", { "Content-type": "text/html" });
//     // let data = fs.createReadStream("./index.html", "utf-8");
//     // // source ==> data
//     // // destination ==> res
//     // data.pipe(res);

//     //!sending css file using streams
//     res.writeHead(200, "ok", { "Content-type": "text/css" });
//     fs.createReadStream("./styles.css", "utf-8").pipe(res);
//   })
//   .listen(9000, (err) => {
//     if (err) console.log(err);
//     console.log("server running");
//   });

//! ============= Routing ============================

let http = require("http");
let fs = require("fs");
http
  .createServer((req, res) => {
    // console.log(req.url);
    // res.end(req.url);
    //! html page
    if (req.url === "/html") {
      // res.end("this is html page");
      res.writeHead(200, "ok", { "content-type": "text/html" });
      fs.createReadStream("./Pages/index.html", "utf-8").pipe(res);
    }
    //! css page
    else if (req.url === "/css") {
      // res.end("this is css page");
      res.writeHead(200, "ok", { "content-type": "text/css" });
      fs.createReadStream("./Pages/styles.css", "utf-8").pipe(res);
    }
    //! json data
    else if (req.url === "/json") {
      // res.write("this is json data");
      // res.end();
      res.writeHead(200, "ok", { "content-type": "application/json" });
      fs.createReadStream("./Pages/data.json", "utf-8").pipe(res);
    }
    //! download page
    else if (req.url === "/download") {
      res.end("this is download page");
    }

    //! about page
    else if (req.url === "/about") {
      res.end("about page");
    } else {
      res.end("<h1> no page found </h1>");
    }
  })
  .listen(9000, (err) => {
    if (err) console.log(err);
    console.log("server running at port 9000");
  });

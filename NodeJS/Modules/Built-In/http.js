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

let http = require("http");
// console.log(http);
//! steps to create a server
//? 1) import http module
//? 2) use createServer() to create a server
//? 3) assign a port number to the server

let server = http.createServer((req, res) => {
  //   res.end("Hello from server");
  //? to display anything on the output --> write()
  //   res.write("this is a message from write()");
  //   res.write("this is after cycle is ended");
  //   res.end(); // this will terminate the current request-response cycle
  //   res.write("this is after cycle is ended"); // this will throw an error
});

server.listen(9001, (err) => {
  if (err) console.log("error from callback first error" + err);
  console.log("server running at port 9001");
});

//! to tap into the server, open browser and type localhost:portNumber
//! to kill the server click on terminal and press ctrl + c
//! after every modifications we have to restart the server

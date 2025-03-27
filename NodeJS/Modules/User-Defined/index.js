//! 1st way of importing
// syntax --> let variableName = require("path")
// let value = require("./app");

// console.log(value);
// value.greet();
// console.log(value.arr);
// value.printName();

// value()
//
// //! 2nd way of importing;
// let { greet, arr, str, printName, object } = require("./app");
// greet();
// console.log(arr);
// console.log(str);
// console.log(object);
// printName();\

// let value = require("./app");
// console.log(value);
// console.log(value.object);
// console.log(value.greet());

let { greet, myName, object } = require("./app");

console.log(greet());
console.log(myName);

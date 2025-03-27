function greet() {
  console.log("hello");
}

let arr = ["String", false, 124];

let object = {
  name: "abc",
};

let str = "something";

function printName() {
  console.log("name");
}

//! 1st way of exporting
// module.exports = greet; --> default export
// module.exports = arr;
// module.exports = object;
// module.exports = str;

//! using this format==> this will consider the last export statement
module.exportS = {
  greet,
  arr,
  object,
  str,
  printName,
};

// exporting ==> wrapping
// importing ==> unwrapping

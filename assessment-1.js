let fs = require("fs");

let a = 20;
let b = 0;

let addition = a + b;
let subtraction = a + b;
let multiplication = a * b;

let divisionResult;
try {
  if (b === 0) divisionResult = new Error("cannot divide by 0");
  else divisionResult = a / b;
} catch (error) {
  console.log("error while dividing the numbers, cannot pass  the b value as 0");
  console.log(error);
}

fs.writeFileSync(
  "./result.txt",
  `Addition: ${addition}\nSubtraction: ${subtraction}\n Division:${divisionResult}\nMultiplication: ${multiplication}`
);

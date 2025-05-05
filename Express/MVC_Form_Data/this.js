// let obj = {
//   name: "abc",
//   id: 123,
//   f1: function () {
//     console.log(this.id);
//   },
// };

// // function hi() {
// //   console.log(this);
// // }

// // hi();

// // obj.f1();

// function sum({}, str) {
//   console.log(sum);
//   console.log({ a });
//   //   console.log(str);
// }

// sum({}, "string");
// sum({}, "string");
// sum("string");

let arr1 = [1, 2, 3, 4];
let arr2 = [5, 6, 7, 8];
let i = 0;
let j = 0;
let res = [];
while (i < arr1.length) {
  res.push(arr1[i]);
  res.push(arr2[j]);
  i++;
  j++;
}
let arr3 = [5, 3, 4, 1, 2, 3, 2, 2, 3, 4, 5, 5, 0, 0];

arr3.sort((a, b) => {
  if (a === 0) return 1; // Make sure 0 goes to the end
  if (b === 0) return -1; // Make sure 0 goes to the end
  return a - b; // Regular sorting for other numbers
});

console.log(arr3);

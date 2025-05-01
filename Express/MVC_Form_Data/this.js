let obj = {
  name: "abc",
  id: 123,
  f1: function () {
    console.log(this.id);
  },
};

// function hi() {
//   console.log(this);
// }

// hi();

// obj.f1();

function sum({}, str) {
  console.log(sum);
  console.log({ a });
  //   console.log(str);
}

sum({}, "string");
sum({}, "string");
sum("string");

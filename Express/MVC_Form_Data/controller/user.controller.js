//& 1) import the collection
const userCollection = require("../models/user.model");

//! define CRUD

let addUser = async (req, res) => {
  console.log(req.body);
  // let { name, email, password, phone } = req.body;
  //& 1st way ==> create()
  //   let newUser = await userCollection.create({ name, email, password, phone });
  //& 2nd way ==> save()
  let newUser = new userCollection(req.body);
  await newUser.save();
  // res.send("user added successfully");
  //! json response
  res.status(201).json({
    success: true,
    message: "user added successfully",
  });
};

let fetchAllUsers = async (req, res) => {
  let users = await userCollection.find();
  // res.send(users);
  res.status(200).json({ success: true, message: "users fetched successfully", data: users });
};

let fetchOneUser = async (req, res) => {
  console.log(req.params);
  let extractedID = req.params.id;
  console.log(extractedID);

  let user = await userCollection.findOne({ _id: extractedID });

  res.send(user);
};

let updateUser = async (req, res) => {
  console.log(req.body);
  let { id } = req.params;
  let { name, email, phone, password } = req.body;
  // let user = await userCollection.findOne({ _id: id });
  //! 1st way
  // user.name = updatedName || user.name;
  // user.email = updatedEmail || user.email;
  // user.phone = updatedPhone || user.phone;
  // user.password = updatedPassword || user.password; // assigning the value

  // await user.save(); // saving the value

  let result = await userCollection.updateOne({ _id: id }, { $set: req.body });
  // console.log(result);

  res.send("user updated successfully");
};

let deleteUser = async (req, res) => {
  let { id } = req.params;
  // let  id  = req.params.id

  let user = await userCollection.findOne({ _id: id });
  let name = user.name;

  let result = await userCollection.deleteOne({ _id: id });
  console.log("user deleted", name);

  res.send(`user ${name} deleted successfully`);
};

module.exports = {
  addUser,
  fetchAllUsers,
  fetchOneUser,
  updateUser,
  deleteUser,
};

/*
[Object: null prototype] { id: '68089a9c36c22615c911992f' }
*/

// https://www.amazon.in/boAt-BassHeads-100-Headphones-Black/dp/B071Z8M4KX/ref=sr_1_1?_encoding=UTF8&content-id=amzn1.sym.82b20790-8877-4d70-8f73-9d8246e460aa&dib=eyJ2IjoiMSJ9.u-Idkf73CqPLuA1aaV9B-zRL-2PX564RMWSjNwtdcz7Xc9FSFmU-X8kerKGd_uNaS7X4jJbxbYHZr8Zi8WXavnSeku8688AnKx-zP5yz7tq4G_sNQa9-iVNwXWGkc4lV8-9c_hRykO7z8vCPDzKMj0Zxz6OWm0yCw5juQu7kzXeZotSq2tMcVUplR2_oPMGTaPynxp9RVB1L5mLRF9GTA2NNZBBYHI2jdh-D9nwGLNl2OLDZJ4KRfYin_7rUja6qL_1_7usEwKWCzoZqDiI-7eqDqfpFIKbnC-qCNs2kLVc.VMcC7vMT85dNKIaUiiDMJs8OwG46NpKQlbF1FEJPpok&dib_tag=se&pd_rd_r=d805f88c-afbe-493e-a376-75e3cfb572c3&pd_rd_w=HQni1&pd_rd_wg=BJEt7&qid=1745477782&refinements=p_89%3AboAt&s=electronics&sr=1-1&th=1

// https://www.amazon.in/boAt-Rockerz-255-Pro-Earphones/dp/B08TV2P1N8/ref=sr_1_2?_encoding=UTF8&content-id=amzn1.sym.82b20790-8877-4d70-8f73-9d8246e460aa&dib=eyJ2IjoiMSJ9.u-Idkf73CqPLuA1aaV9B-zRL-2PX564RMWSjNwtdcz7Xc9FSFmU-X8kerKGd_uNaS7X4jJbxbYHZr8Zi8WXavnSeku8688AnKx-zP5yz7tq4G_sNQa9-iVNwXWGkc4lV8-9c_hRykO7z8vCPDzKMj0Zxz6OWm0yCw5juQu7kzXeZotSq2tMcVUplR2_oPMGTaPynxp9RVB1L5mLRF9GTA2NNZBBYHI2jdh-D9nwGLNl2OLDZJ4KRfYin_7rUja6qL_1_7usEwKWCzoZqDiI-7eqDqfpFIKbnC-qCNs2kLVc.VMcC7vMT85dNKIaUiiDMJs8OwG46NpKQlbF1FEJPpok&dib_tag=se&pd_rd_r=d805f88c-afbe-493e-a376-75e3cfb572c3&pd_rd_w=HQni1&pd_rd_wg=BJEt7&qid=1745477782&refinements=p_89%3AboAt&s=electronics&sr=1-2

// http://localhost:9000/user/{UNIQUE_ID} ==> _id

//? req.params ==> UNIQUE_ID

// db.users.updateOne(
//   {
//     _id: "123",
//   },
//   {
//     $set: { name: "abc", email: "abc", password: "abc", phone: "abc" },
//   }
// );

// await userCollection.updateOne({ filter }, { $set: req.body });
// req.body = { password: };

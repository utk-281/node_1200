//! app, built-in, error, router, user-defined, third-party
const { verify } = require("jsonwebtoken");
const userCollection = require("../models/user.model");
// console.log(jwt);

const authenticate = async (req, res, next) => {
  console.log(req.cookies);
  let token = req.cookies["my-cookie"];
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Please log in to access this resource" });
  }
  //& decode the token --> verify()
  let decodedToken = verify(token, "secret_key");
  //   console.log(decodedToken);
  let id = decodedToken.payload;
  let user = await userCollection.findById(id);
  if (!user) return res.status(401).json({ message: "Invalid Token" });

  //   //! store the user details in req
  //   req.myUser = user;

  next();
};

module.exports = { authenticate };

/*req.cookies =  {
  'my-cookie': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiNjgxMzI3MDk2ZjhjNGJkOWQ4NjUxOTA0IiwiaWF0IjoxNzQ2MjU3MjgyLCJleHAiOjE3NDYzNDM2ODJ9.YR8wAQy9B86fb6qwUoHf5bx00EWSf-FjrDrEYKeYvM0'
} */

//  decodedToken =  {
//   payload: '681327096f8c4bd9d8651904',
//   iat: 1746258383,
//   exp: 1746344783
// }

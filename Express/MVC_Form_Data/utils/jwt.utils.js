const jwt = require("jsonwebtoken");

//! generate token
const generateToken = async (payload) => {
  let token = jwt.sign({ payload }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return token;
};
module.exports = { generateToken };

//! sign({payload}, "secret_key", options) is used to generate a token based on a payload
//? ==> payload --> we pass the user data in the payload
//? secret_key --> it is a secret key that is used to sign the token and also used during decoding the token
//? options --> it is an object that contains the expiration time of the token

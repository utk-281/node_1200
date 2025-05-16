const error = (err, req, res, next) => {
  //! ValidationError
  if (err.name === "ValidationError") {
    err.statusCode = 400;
    err.message = Object.values(err.errors).map((ele) => ele.message);
  }

  //! JsonWebTokenError
  if (err.name === "JsonWebTokenError") {
    err.statusCode = 401;
    err.message = "Please log in again";
  }

  //! CastError
  if (err.name === "CastError") {
    err.statusCode = 400;
    err.message = "Invalid MongoDB ID";
  }

  // console.log(err);
  //! global error handler
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    errObj: err,
  });
};

module.exports = error;

// obj1 ==> new Error("Internal Server Error", 500)
// obj2 ==> new Error("msg", 123)

//& in this, we will handle all the error object

/*
{
        "errors": {
            "phoneNumber": {
                "name": "ValidatorError",
                "message": "phone number is required",
                "properties": {
                    "message": "phone number is required",
                    "type": "required",
                    "path": "phoneNumber"
                },
                "kind": "required",
                "path": "phoneNumber"
            },
            "name": {
                "name": "ValidatorError",
                "message": "name is required",
                "properties": {
                    "message": "name is required",
                    "type": "required",
                    "path": "name"
                },
                "kind": "required",
                "path": "name"
            }
        },
        "_message": "User validation failed",
        "statusCode": 500,
        "name": "ValidationError",
        "message": "User validation failed: phoneNumber: phone number is required, name: name is required"
    }

    errObj:{
    }

*/

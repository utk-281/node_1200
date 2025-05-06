const error = (err, req, res, next) => {
  //! global error handler
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    errObj: err,
    success: false,
    message: err.message,
  });
};

module.exports = error;

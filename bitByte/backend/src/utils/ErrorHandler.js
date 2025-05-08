class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(); // this will call the constructor of parent class --> Error
    this.message = message;
    this.statusCode = statusCode;
  }
}

module.exports = ErrorHandler;

//! to generate a custom defined error object

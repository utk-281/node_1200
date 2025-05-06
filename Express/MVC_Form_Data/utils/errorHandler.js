class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(); // it calls the constructor of parent class
    this.message = message;
    this.statusCode = statusCode;
  }
}

module.exports = ErrorHandler;

new ErrorHandler("no blog found", 404);

class ErrorSender {
  constructor() {}

  static errorObject(statusCode, message) {
    return { status: statusCode, message };
  }
}

module.exports = ErrorSender;

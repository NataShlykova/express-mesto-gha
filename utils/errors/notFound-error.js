const { NOT_FOUND_ERROR_CODE } = require('../Constans');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND_ERROR_CODE;
  }
}

module.exports = NotFoundError;

const { INTERNAL_ERROR_CODE } = require('../Constans');

class InternalError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = INTERNAL_ERROR_CODE;
  }
}

module.exports = InternalError;

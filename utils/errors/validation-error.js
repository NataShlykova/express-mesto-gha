const { VALIDATION_ERROR_CODE } = require('../Constans');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = VALIDATION_ERROR_CODE;
  }
}

module.exports = ValidationError;

const { INTERNAL_ERROR_CODE } = require('./errorConstans');

class InternalError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = INTERNAL_ERROR_CODE;
  }
}

module.exports = new InternalError('На сервере произошла ошибка');

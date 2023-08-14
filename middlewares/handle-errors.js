const { ValidationError, CastError, DocumentNotFoundError } = require('mongoose').Error;
const UnauthorizedError = require('../utils/errors/unauthorized-error');
const NotFoundError = require('../utils/errors/notFound-error');
const ForbiddenError = require('../utils/errors/forbidden-error');
const {
  VALIDATION_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  CONFLICT_ERROR_CODE,
  DEFAULT_ERROR_CODE,
} = require('../utils/Constans');

module.exports = (err, req, res, next) => {
  if (err instanceof ValidationError || err instanceof CastError) {
    return res
      .status(VALIDATION_ERROR_CODE)
      .send({ message: 'Неверные данные' });
  }

  if (err instanceof DocumentNotFoundError) {
    return res
      .status(NOT_FOUND_ERROR_CODE)
      .send({
        message: 'Пользователь с указанным _id не найден',
      });
  }

  if (err instanceof NotFoundError
    || err instanceof ForbiddenError
    || err instanceof UnauthorizedError) {
    const { message } = err;
    return res
      .status(err.statusCode)
      .send({ message });
  }

  if (err.code === 11000) {
    return res
      .status(CONFLICT_ERROR_CODE)
      .send({ message: 'Адрес почты уже зарегистрирован в базе данных' });
  }

  res
    .status(DEFAULT_ERROR_CODE)
    .send({
      message: 'Ошибка на сервере',
    });

  return next();
};

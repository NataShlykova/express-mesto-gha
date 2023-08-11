const { CastError, ValidationError, DocumentNotFound } = require('mongoose').Error;
const {
  NOT_FOUND_ERROR_CODE,
  CONFLICT_ERROR_CODE,
  VALIDATION_ERROR_CODE,
  INTERNAL_ERROR_CODE,
} = require('../utils/Constans');
const NotFoundError = require('../utils/errors/notFound-error');
const UnauthorizedError = require('../utils/errors/unauthorized-error');
const ForbiddenError = require('../utils/errors/forbidden-error');

module.exports = (err, req, res, next) => {
  if (err instanceof CastError || err instanceof ValidationError) {
    return res
      .status(VALIDATION_ERROR_CODE)
      .send({ message: 'Данные переданы некорректно' });
  }
  if (err instanceof DocumentNotFound) {
    return res
      .status(NOT_FOUND_ERROR_CODE)
      .send({ messaege: 'Пльзователь не найден' });
  }
  if (
    err instanceof NotFoundError
    || err instanceof UnauthorizedError
    || err instanceof ForbiddenError
  ) {
    const { message } = err;
    return res.status(err.statusCode).send({ message });
  }
  if (err.code === 11000) {
    return res.status(CONFLICT_ERROR_CODE).send({
      message: 'Элетронный адрес уже зарегистрирован',
    });
  }

  res.status(INTERNAL_ERROR_CODE).send({
    message: 'Ошибка на сервере',
  });

  return next();
};

const CREATED_CODE = 201;
const VALIDATION_ERROR_CODE = 400;
const UNAUTHORIZED_ERROR_CODE = 401;
const FORBIDDEN_ERROR_CODE = 403;
const NOT_FOUND_ERROR_CODE = 404;
const CONFLICT_ERROR_CODE = 409;
const INTERNAL_ERROR_CODE = 500;

const handleDefaultError = (err, res) => {
  res.status(INTERNAL_ERROR_CODE).send({ message: 'Произошла ошибка сервера!' });
};

module.exports = {
  CREATED_CODE,
  VALIDATION_ERROR_CODE,
  UNAUTHORIZED_ERROR_CODE,
  FORBIDDEN_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  CONFLICT_ERROR_CODE,
  INTERNAL_ERROR_CODE,
  handleDefaultError,
};


const validationErrorCode = 400;
const notFoundErrorCode = 404;
const defaultErrorCode = 500;
const handleDefaultError = (err, res) => {
  console.log(err);
  res.status(defaultErrorCode).send({ message: err.name });
};

module.exports = {
  validationErrorCode,
  notFoundErrorCode,
  defaultErrorCode,
  handleDefaultError,
};
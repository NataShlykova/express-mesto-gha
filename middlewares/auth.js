const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/Constans');
const UnauthorizedError = require('../utils/errors/unauthorized-error');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Нужна авторизация'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError('Нужна авторизация'));
  }
  req.user = payload;
  return next();
};

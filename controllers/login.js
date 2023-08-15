const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../utils/Constans');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res
        .cookie('token', token, {
          sameSite: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        })
        .send({ token });
    })
    .catch(next);
};

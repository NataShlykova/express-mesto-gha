const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { UNAUTHORIZED_ERROR_CODE, JWT_SECRET } = require('../utils/Constans');

module.exports.login = (req, res) => {
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
    .catch((err) => {
      res.status(UNAUTHORIZED_ERROR_CODE).send({ message: err.message });
    });
};

const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { UNAUTHORIZED_ERROR_CODE } = require('../utils/errors/errorConstans');

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', {
        expiresIn: '7d',
      });
      res
        .cookie('token', token, {
          maxAge: 10000000,
          httpOnly: true,
          sameSite: true,
        })
        .send({ token });
    })
    .catch((err) => {
      res.status(UNAUTHORIZED_ERROR_CODE).send({ message: err.massage });
    });
};

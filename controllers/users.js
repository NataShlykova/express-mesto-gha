const bcrypt = require('bcryptjs');
const User = require('../models/user');

const {
  VALIDATION_CODE,
  NOT_FOUND_ERROR_CODE,
} = require('../utils/Constans');

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.status(200).send(user))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res
      .status(VALIDATION_CODE)
      .send({ data: user }))

    .catch(next);
};

const verification = (user, res) => {
  if (user) {
    return res.send({ data: user });
  }
  return res
    .status(NOT_FOUND_ERROR_CODE)
    .send({ message: 'Пользователь с указанным _id не найден' });
};

module.exports.getUser = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => verification(user, res))
    .catch((error) => {
      next(error);
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )

    .then((user) => verification(user, res))
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })

    .then((user) => verification(user, res))
    .catch(next);
};

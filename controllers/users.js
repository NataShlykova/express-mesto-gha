const bcrypt = require('bcryptjs');
const User = require('../models/user');

const {
  VALIDATION_CODE,
} = require('../utils/Constans');
const ConflictError = require('../utils/errors/conflict-error');
const ValidationError = require('../utils/errors/validation-error');
const NotFoundError = require('../utils/errors/notFound-error');

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

    .catch((error) => {
      if (error.code === 11000) {
        next(new ConflictError('Адрес почты уже зарегистрирован в базе данных'));
      } else if (error.name === 'ValidationError') {
        next(new ValidationError('Данные некорректны'));
      } else {
        next(error);
      }
    });
};

const verification = (user, res) => {
  if (!user) {
    throw new NotFoundError('Пользователь с указанным _id не найден');
  }
  return res.send({ data: user });
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
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new ValidationError('Ошибка валидации данных'));
      } else {
        next(error);
      }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })

    .then((user) => verification(user, res))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new ValidationError('Ошибка валидации данных'));
      } else {
        next(error);
      }
    });
};

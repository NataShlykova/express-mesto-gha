const users = require('express').Router();
const { Joi, celebrate } = require('celebrate');

const {
  getUsers,
  getCurrentUser,
  getUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');
const { regExpUrl } = require('../utils/regexp/regExpUrl');

users.get('/', getUsers);
users.get('/me', getCurrentUser);
users.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().required().length(24).hex(),
    }),
  }),
  getUser,
);
users.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateProfile,
);
users.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().regex(regExpUrl).required(),
    }),
  }),
  updateAvatar,
);

module.exports = users;

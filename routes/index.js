const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const cards = require('./cards');
const users = require('./users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../utils/errors/notFound-error');
const { login } = require('../controllers/login');
const { createUser } = require('../controllers/users');
const { regExpUrl } = require('../utils/regexp/regExpUrl');

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(regExpUrl),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);

router.use(auth);

router.use('/users', users);
router.use('/cards', cards);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Некорректно указан путь'));
});

module.exports = router;

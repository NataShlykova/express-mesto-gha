const router = require('express').Router();
const NotFoundError = require('../utils/errors/notFound-error');
const verification = require('./verification');
const auth = require('../middlewares/auth');
const users = require('./users');
const cards = require('./cards');

router.use('/', verification);

router.use(auth);
router.use('/users', users);
router.use('/cards', cards);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Некорректно указан путь'));
});

module.exports = router;

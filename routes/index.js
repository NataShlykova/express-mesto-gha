const router = require('express').Router();
const NotFoundError = require('../utils/errors/notFound-error');
const verification = require('./verification');
const auth = require('../middlewares/auth');

router.use('/', verification);

router.use(auth);
router.use('/users', require('./users'));
router.use('/cards', require('./cards'));

router.use('*', (req, res, next) => {
  next(new NotFoundError('Некорректно указан путь'));
});

module.exports = router;

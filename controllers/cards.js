const Card = require('../models/card');
const NotFoundError = require('../utils/errors/notFound-error');
const ForbiddenError = require('../utils/errors/forbidden-error');
const { NOT_FOUND_ERROR_CODE } = require('../utils/errors/errorConstans');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate([
      { path: 'owner', model: 'user' },
      { path: 'likes', model: 'user' },
    ])
    .then((card) => res.send(card))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => card.populate('owner'))
    .then((card) => res.status(201).send(card))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .populate([{ path: 'owner', model: 'user' }])
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточки с указанным _id не cуществует');
      }
      if (card.owner_id.toString() !== req.user._id.toString) {
        throw new ForbiddenError('Удалять можно только свою карточку');
      }
      Card.findByIdAndDelete(req.params.cardId)
        .populate([{ path: 'owner', model: 'user' }])

        .then((removedCard) => {
          res.send(removedCard);
        });
    })
    .catch(next);
};

function verification(card, res) {
  if (card) {
    return res.send(card);
  }
  return res
    .status(NOT_FOUND_ERROR_CODE)
    .send({ message: 'Карточки с указанным _id не cуществует' });
}

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate([
      { path: 'owner', model: 'user' },
      { path: 'like', model: 'user' },
    ])
    .then((user) => verification(user, res))
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate([
      { path: 'owner', model: 'user' },
      { path: 'like', model: 'user' },
    ])
    .then((user) => verification(user, res))
    .catch(next);
};

/* eslint-disable comma-dangle */
const { Router } = require('express');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const {
  validCard,
  validId
} = require('../middlewares/validation');

const cardsRouter = Router();

cardsRouter.get('/cards', getCards);

cardsRouter.post('/cards', validCard, createCard);

cardsRouter.delete('/cards/:_id', validId, deleteCard);

cardsRouter.put('/cards/:_id/likes', validId, likeCard);

cardsRouter.delete('/cards/:_id/likes', validId, dislikeCard);

module.exports = cardsRouter;

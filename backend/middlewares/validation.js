/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const { celebrate, Joi } = require('celebrate');

const validCustom = (url) => {
  const result = validator.isURL(url);
  if (!result) {
    throw new Error('URL is not valid');
  }
  return url;
};

const validId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24).hex(),
  }),
});

const validLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(20),
    avatar: Joi.string().custom(validCustom),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validCustom),
  }),
});

const validAbout = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(20),
  }),
});

const validAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validCustom),
  }),
});

module.exports = {
  validId,
  validLogin,
  validUser,
  validCard,
  validAbout,
  validAvatar,
};

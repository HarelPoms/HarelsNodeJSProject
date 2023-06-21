const Joi = require("joi");
const createCardTemplate = {
  title: Joi.string().min(2).max(256).required(),
  subTitle: Joi.string().min(2).max(256).required(),
  description: Joi.string().min(2).max(1024).required(),
  phone: Joi.string()
    .regex(new RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/))
    .required(),
  email: Joi.string()
    .regex(
      new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
    )
    .required(),
  web: Joi.string()
    .regex(
      new RegExp(
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
      )
    )
    .allow(""),
  image: Joi.object().keys({
    url: Joi.string().regex(
      new RegExp(
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
      )
    ),
    alt: Joi.string().min(2).max(256).required(),
  }),
  address: Joi.object().keys({
    state: Joi.string().min(2).max(256),
    country: Joi.string().min(2).max(256).required(),
    city: Joi.string().min(2).max(256).required(),
    street: Joi.string().min(2).max(256).required(),
    houseNumber: Joi.number().min(1).required(),
    zip: Joi.number().allow("", 0),
  }),
  bizNumber: Joi.number().min(1000000).max(9999999).allow(""),
  user_id: Joi.string().hex().length(24),
};

const createCardSchema = Joi.object({...createCardTemplate});

const editCardSchema = Joi.object({...createCardTemplate, likes: Joi.array().items(Joi.string())});

const cardIdSchema = Joi.string().hex().length(24).required();

const bizNumberSchema = Joi.number().min(1000000).max(9999999).required();

const validateCreateCardSchema = (userInput) => {
  return createCardSchema.validateAsync(userInput);
};

const validateEditCardSchema = (userInput) => {
  return editCardSchema.validateAsync(userInput);
}

const validateCardIdSchema = (userInput) => {
  return cardIdSchema.validateAsync(userInput);
}

const validateBizNumberSchema = (userInput) => {
  return bizNumberSchema.validateAsync(userInput);
}

module.exports = {
  validateCreateCardSchema, validateEditCardSchema, validateCardIdSchema, validateBizNumberSchema
};

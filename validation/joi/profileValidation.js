const Joi = require("joi");

const profileSchema = Joi.object({
    name: Joi.object()
        .keys({
            first: Joi.string().min(2).max(256).required(),
            middle: Joi.string().min(2).max(256).allow(""),
            last: Joi.string().min(2).max(256).required(),
        }),
    phone: Joi.string()
        .regex(new RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/)),
    email: Joi.string().regex(
            new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
        ),
    password: Joi.string().regex(
            new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
        ),
    image: Joi.object().keys({
        url: Joi.string().regex(
        new RegExp(
            /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
        )
        ),
        alt: Joi.string().min(2).max(256).required(),
    }),
    address: Joi.object()
        .keys({
        state: Joi.string().min(2).max(256),
        country: Joi.string().min(2).max(256).required(),
        city: Joi.string().min(2).max(256).required(),
        street: Joi.string().min(2).max(256).required(),
        houseNumber: Joi.number().min(1).required(),
        zip: Joi.number().allow("", 0),
        })
        .required(),
    isAdmin: Joi.boolean().allow(""),
    isBusiness: Joi.boolean().required(),
});

const validateProfileSchema = (userInput) =>
    profileSchema.validateAsync(userInput);

module.exports = {
    validateProfileSchema,
};

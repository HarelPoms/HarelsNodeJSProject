const Joi = require("joi");

const userIdSchema = Joi.string().hex().length(24).required();

const validateUserIdSchema = (userInput) => {
    return userIdSchema.validateAsync(userInput);
}

module.exports = {
    validateUserIdSchema
};

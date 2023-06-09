const config = require("config");
const joiRegisterValidation = require("./joi/registerValidation");
const joiLoginValidation = require("./joi/loginValidation");
const joiUserIdValidation = require("./joi/userIdValidation");
const joiProfileValidation = require("./joi/profileValidation");

const validatorOption = config.get("validatorOption");

const registerUserValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiRegisterValidation.validateRegisterSchema(userInput);
  }
  throw new Error("validator undefined");
};
const loginUserValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiLoginValidation.validateLoginSchema(userInput);
  }
  throw new Error("validator undefined");
};
const userIdValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiUserIdValidation.validateUserIdSchema(userInput);
  }
  throw new Error("validator undefined");
}
const profileUserValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiProfileValidation.validateProfileSchema(userInput);
  }
  throw new Error("validator undefined");
}
module.exports = {
  registerUserValidation,
  loginUserValidation,
  userIdValidation,
  profileUserValidation
};

const CustomError = require("../utils/CustomError");
const { getCardById } = require("../model/cardsService/cardsService");
const { getUserById } = require("../model/usersService/usersService");

const {cardIdValidation} = require("../validation/cardsValidationService");
const {userIdValidation} = require("../validation/usersValidationService");

const checkIfBizOwner = async (userId, cardId, res, next) => {
  try {
    cardIdValidation(cardId);
    const cardData = await getCardById(cardId);
    if (!cardData) {
      return res.status(400).json({ msg: "card not found" });
    }
    if (cardData.user_id == userId) {
      next();
    } else {
      res.status(401).json({ msg: "You are not the business user who owns the card" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

const userCheckIfTheSameUser = async (loggedInUserId, idOfUserDataToAccess, res, next) => {
  userIdValidation(idOfUserDataToAccess);
  // if(userId !== idOfUserDataToAccess){
  //   res.status(401).json({msg: "You are not allowed to access this"})
  // }
  const UserData = await getUserById(idOfUserDataToAccess);
  if (!UserData) {
    return res.status(400).json({ msg: "User not found" });
  }
  if (UserData._id == loggedInUserId){
    next();
  }
  else{
    res.status(401).json({ msg: "You are not the same registered user" });
  }
}

/*
  isBiz = every biz
  isAdmin = is admin
  isBizOwner = biz owner
*/

const permissionsMiddleware = (isBiz, isAdmin, isBizOwner, isSameUserApiCheck) => {
  return (req, res, next) => {
    if (!req.userData) {
      throw new CustomError("must provide userData");
    }
    if (isBiz === req.userData.isBusiness && isBiz === true) {
      return next();
    }
    if (isAdmin === req.userData.isAdmin && isAdmin === true) {
      return next();
    }
    if (isBizOwner === req.userData.isBusiness && isBizOwner === true) {
      return checkIfBizOwner(req.userData._id, req.params.id, res, next);
    }
    if (isSameUserApiCheck === true){
      return userCheckIfTheSameUser(req.userData._id, req.params.id, res, next);
    }
    res.status(401).json({ msg: "You are not allowed to modify this asset" });
  };
};

module.exports = permissionsMiddleware;

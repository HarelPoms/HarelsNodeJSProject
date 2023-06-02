const usersService = require("../model/usersService/usersService");
const cardsService = require("../model/cardsService/cardsService");
const hashService = require("../utils/hash/hashService");
const normalizeUser = require("../model/usersService/helpers/normalizationUserService");
const normalizeCard = require("../model/cardsService/helpers/normalizationCardService");

const usersData = require("./users.json");
const cardsData = require("./cards.json");

const initialData = async () => {
  try {
    let cards = await cardsService.getAllCards();
    if (cards.length) {
      return;
    }
    let users = await usersService.getAllUsers();
    if (users.length) {
      return;
    }
    let user_id = "";
    let registerResult;
    for (let user of usersData) {
      user.password = await hashService.generateHash(user.password);
      user = normalizeUser(user);
      registerResult = await usersService.registerUser(user);
      if(registerResult.isBusiness){
        user_id = registerResult;
      }
    }
    user_id = user_id._id + "";
    for (let card of cardsData) {
      card = await normalizeCard(card, user_id);
      await cardsService.createCard(card);
    }
  } catch (err) {
    console.log("err from initial", err);
  }
};

module.exports = initialData;

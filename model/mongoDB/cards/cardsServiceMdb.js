const Card = require("./Card");
const mongoose = require("mongoose");


const createCard = (cardToSave) => {
  let card = new Card(cardToSave);
  return card.save();
};

const getAllCards = () => {
  return Card.find();
};

const getCardById = (id) => {
  return Card.findById(id);
};

const getCardByBizNumber = (bizNumber) => {
  return Card.findOne({ bizNumber }, { bizNumber: 1, _id: 0 });
};

const updateCard = (id, cardToUpdate) => {
  return Card.findByIdAndUpdate(id, cardToUpdate, {
    new: true,
  });
};

const deleteCard = (id) => {
  return Card.findByIdAndDelete(id);
};

const getCardsLikedByUser = (id) => {
  return Card.find({likes: id});
}

const getCardsCreatedByUser = (id) => {
  return Card.find({user_id: mongoose.Types.ObjectId(id)});
}

module.exports = {
  createCard,
  getAllCards,
  getCardById,
  getCardByBizNumber,
  getCardsLikedByUser,
  getCardsCreatedByUser,
  updateCard,
  deleteCard,
};

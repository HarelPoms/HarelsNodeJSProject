const express = require("express");
const router = express.Router();
const cardsServiceModel = require("../../model/cardsService/cardsService");
const cardsValidationService = require("../../validation/cardsValidationService");
const loggedInMiddleware = require("../../middlewares/checkLoggedInMiddleware");
const permissionsMiddleware = require("../../middlewares/permissionsMiddleware");
const normalizeCardService = require("../../model/cardsService/helpers/normalizationCardService");

//Get all cards, authorization : all, return : All Cards
router.get("/", async (req, res) => {
    console.log("in cards get");
    const allCards = await cardsServiceModel.getAllCards();
    res.status(200).json(allCards);
});

//Get my cards, authorization : The Registered User, return : Array of users cards
//DOUBLE CHECK
router.get("/my-cards", loggedInMiddleware, permissionsMiddleware(false,false,false,true), async (req,res) =>{
    let cardsCreatedByUser = await cardsServiceModel.getCardsCreatedByUser(req.userData._id);
    res.status(200).json(cardsCreatedByUser);
});

//Get card by id, authorization : all, Return : The card
router.get("/:id", async (req, res) => {
    await cardsValidationService.cardIdValidation(req.params.id);
    const cardFromDB = await cardsServiceModel.getCardById(req.params.id);
    res.status(200).json(cardFromDB);
});

//Create new card, authorization : Business User, Return : The new card
router.post("/", loggedInMiddleware, permissionsMiddleware(true,false,false,false), async (req,res) => {
    await cardsValidationService.createCardValidation(req.body);
    let normalCard = await normalizeCardService(req.body, req.userData._id);
    const dataFromMongoose = await cardsServiceModel.createCard(normalCard);
    console.log("created card from Mongoose ", dataFromMongoose);
    res.status(200).json(dataFromMongoose);
});

//Edit card, authorization : User who created the card, Return : The edited card
router.put("/:id", loggedInMiddleware , permissionsMiddleware(false,false,true,false), async (req, res) => {
    await cardsValidationService.cardIdValidation(req.params.id);
    let normalizedCard = await normalizeCardService(req.body, req.userData._id);
    let editResult = await cardsServiceModel.updateCard(req.params.id, normalizedCard);
    res.status(200).json(editResult);
})

//Like card, authorization : The User is registered, Return : The Liked Card
router.patch("/:id", loggedInMiddleware, async (req, res) => {
    await cardsValidationService.cardIdValidation(req.params.id);
    const cardFromDB = await cardsServiceModel.getCardById(req.params.id);
    const userIdStr = req.userData._id + "";
    if(cardFromDB){
        const cardLikes = cardFromDB.likes.find((id) => id === userIdStr);
        if(!cardLikes){
            cardFromDB.likes.push(userIdStr);
            cardAfterSave = await cardsServiceModel.updateCard(req.params.id, cardFromDB);
            res.status(200).json(cardAfterSave);
        }
        const likesFiltered = cardFromDB.likes.filter((id) => id !== userIdStr);
        cardFromDB.likes = likesFiltered;
        cardAfterSave = await cardsServiceModel.updateCard(req.params.id, cardFromDB);
        res.status(200).json(cardAfterSave);
    }
    else{
        res.json({msg: "could not find the card to like"});
    }
})

//Delete Card, Authorization : The User who created the card, or admin, return : The Deleted Card
router.delete("/:id", loggedInMiddleware, permissionsMiddleware(false,true,true,false),  async (req, res) => {
    await cardsValidationService.cardIdValidation(req.params.id);
    const cardFromDB = await cardsServiceModel.deleteCard(req.params.id);
    if (cardFromDB) {
        res.json({ msg: "card deleted" });
    } else {
        res.json({ msg: "could not find the card" });
    }
})


module.exports = router;
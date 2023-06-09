const express = require("express");
const router = express.Router();
const cardsServiceModel = require("../../model/cardsService/cardsService");
const cardsValidationService = require("../../validation/cardsValidationService");
const loggedInMiddleware = require("../../middlewares/checkLoggedInMiddleware");
const permissionsMiddleware = require("../../middlewares/permissionsMiddleware");
const normalizeCardService = require("../../model/cardsService/helpers/normalizationCardService");
const CustomError = require("../../utils/CustomError");
const finalCheck = require("../../utils/finalResponseChecker");
const initialValidationService = require("../../utils/initialValidationCheckers");

//Get all cards, authorization : all, return : All Cards
router.get("/", async (req, res) => {
    const allCards = await cardsServiceModel.getAllCards();
    res.status(200).json(allCards);
});

//Get my cards, authorization : The Registered User, return : Array of users cards
//DOUBLE CHECK
router.get("/my-cards", loggedInMiddleware, permissionsMiddleware(true,false,false,false), async (req,res) =>{
    let cardsCreatedByUser = await cardsServiceModel.getCardsCreatedByUser(req.userData._id);
    res.status(200).json(cardsCreatedByUser);
});

//Get card by id, authorization : all, Return : The card
router.get("/:id", async (req, res, next) => {
    let idTest = await initialValidationService.initialJoiValidation(cardsValidationService.cardIdValidation, req.params.id);
    if(!idTest[0]) return next(new CustomError(400, idTest[1]));
    const cardFromDB = await cardsServiceModel.getCardById(req.params.id);
    finalCheck(res, cardFromDB, 400, "Card to get not found");
});

//Create new card, authorization : Business User, Return : The new card
router.post("/", loggedInMiddleware, permissionsMiddleware(true,false,false,false), async (req,res,next) => {
    let newCardBodyTest = await initialValidationService.initialJoiValidation(cardsValidationService.createCardValidation, req.body);
    if(!newCardBodyTest[0]) return next(new CustomError(400,newCardBodyTest[1]));
    if(!req.body.address) return next(new CustomError(400,"Cannot create card without address"));
    let normalCard = await normalizeCardService(req.body, req.userData._id);
    const newCard = await cardsServiceModel.createCard(normalCard);
    finalCheck(res, newCard, 500, "Card not created");
});

//Edit card, authorization : User who created the card, Return : The edited card
//Need to DOUBLE CHECK AND RETHINK THE LOGIC, Normalization needs expanding/rework
router.put("/:id", loggedInMiddleware , permissionsMiddleware(false,false,true,false), async (req, res,next) => {
    let idTest = await initialValidationService.initialJoiValidation(cardsValidationService.cardIdValidation, req.params.id);
    if(!idTest[0]) return next(new CustomError(400, idTest[1]));
    let editBodyTest = await initialValidationService.initialJoiValidation(cardsValidationService.editCardValidation, req.body);
    if(!editBodyTest[0]) return next(new CustomError(400, editBodyTest[1]));
    if(!req.body.address) return next(new CustomError(400,"Cannot edit card without address"));
    let normalizedCard = await normalizeCardService(req.body, req.userData._id);
    let editResult = await cardsServiceModel.updateCard(req.params.id, normalizedCard);
    finalCheck(res, editResult, 400, "Card to edit not found");
})

//Like card, authorization : The User is registered, Return : The Liked Card
router.patch("/:id", loggedInMiddleware, async (req, res, next) => {
    let idTest = await initialValidationService.initialJoiValidation(cardsValidationService.cardIdValidation, req.params.id);
    if(!idTest[0]) return next(new CustomError(400, idTest[1]));
    const cardFromDB = await cardsServiceModel.getCardById(req.params.id);
    const userIdStr = req.userData._id + "";
    if(cardFromDB){
        const cardLikes = cardFromDB.likes.find((id) => id === userIdStr);
        if(!cardLikes){
            cardFromDB.likes.push(userIdStr);
            cardAfterSave = await cardsServiceModel.updateCard(req.params.id, cardFromDB);
            res.status(200).json(cardAfterSave);
        }
        else{
            const likesFiltered = cardFromDB.likes.filter((id) => id !== userIdStr);
            cardFromDB.likes = likesFiltered;
            cardAfterSave = await cardsServiceModel.updateCard(req.params.id, cardFromDB);
            res.status(200).json(cardAfterSave);
        }
    }
    else{
        res.status(400).json({msg: "could not find the card to like"});
    }
})

router.patch("/bizNumberOf/:id/to/:bizId", loggedInMiddleware, permissionsMiddleware(false,true,false,false),
    async (req, res, next) => {
        let idTest = await initialValidationService.initialJoiValidation(cardsValidationService.cardIdValidation, req.params.id);
        if(!idTest[0]) return next(new CustomError(400, idTest[1]));
        const checkIfCardExists = await cardsServiceModel.getCardById(req.params.id);
        if(!checkIfCardExists) return next(new CustomError(400, "Card with given Id doesn't exist"));
        let bizIdTest = await initialValidationService.initialJoiValidation(cardsValidationService.bizNumberValidation, req.params.bizId);
        if(!bizIdTest[0]) return next(new CustomError(400, bizIdTest[1]));
        const checkIfBizNumIsTaken = await cardsServiceModel.getCardByBizNumber(req.params.bizId);
        if(checkIfBizNumIsTaken){
            return next(new CustomError(400, "Cannot update bizNumber, given bizNum already taken"));
        }
        const updatedCardFromDB = await cardsServiceModel.updateCard(req.params.id, {bizNumber: req.params.bizId});
        res.status(200).json(updatedCardFromDB);
});

//Delete Card, Authorization : The User who created the card, or admin, return : The Deleted Card
router.delete("/:id", loggedInMiddleware, permissionsMiddleware(false,true,true,false),  async (req, res,next) => {
    let idTest = await initialValidationService.initialJoiValidation(cardsValidationService.cardIdValidation, req.params.id);
    if(!idTest[0]) return next(new CustomError(400, idTest[1]));
    const cardFromDB = await cardsServiceModel.deleteCard(req.params.id);
    finalCheck(res, cardFromDB, 400, "Could not find the card to delete");
})

module.exports = router;
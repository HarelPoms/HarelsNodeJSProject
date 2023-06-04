const express = require("express");
const router = express.Router();
const usersServiceModel = require("../../model/usersService/usersService");
const usersValidationService = require("../../validation/usersValidationService");
const loggedInMiddleware = require("../../middlewares/checkLoggedInMiddleware");
const permissionsMiddleware = require("../../middlewares/permissionsMiddleware");
const normalizeUser = require("../../model/usersService/helpers/normalizationUserService");
const CustomError = require("../../utils/CustomError");
const hashService = require("../../utils/hash/hashService");
const { generateToken } = require("../../utils/token/tokenService");

//Error template : return next(new CustomError(500,"Fail"));

//Get all users, authorization : Admin, Return : array of users
router.get("/", loggedInMiddleware, permissionsMiddleware(false,true,false,false), async (req, res,next) => {
    let allUsers = await usersServiceModel.getAllUsers();
    res.status(200).json(allUsers);
});

//Get specific user, authorization : Admin or the user himself, Return : User
//TODO fix middleware to consider the user himself
router.get("/:id", loggedInMiddleware, permissionsMiddleware(false,true,false,true), async (req, res) => {
    await usersValidationService.userIdValidation(req.params.id);
    let wantedUser = await usersServiceModel.getUserById(req.params.id);
    if(wantedUser){
        res.status(200).json(wantedUser);
    }
    else{
        res.status(404).json({msg: "User not found"})
    }
});

//Register User, authorization : all, return : registered user, needs unique email
router.post("/", async (req, res) => {
    await usersValidationService.registerUserValidation(req.body);
    let normalizedUser = await normalizeUser(req.body);
    normalizedUser.password = await hashService.generateHash(normalizedUser.password);
    let createdUser = await usersServiceModel.registerUser(normalizedUser);
    if(createdUser){
        res.status(200).json(createdUser);
    }
    else{
        res.status(500).json({msg: "Registration went wrong"});
    }
});

//Login User, authorization : all, return : Encrypted token
router.post("/login", async (req,res, next) =>{
    await usersValidationService.loginUserValidation(req.body);
    const userData = await usersServiceModel.getUserByEmail(req.body.email);
    console.log(userData);
    if (!userData) return next(new CustomError(400,"invalid email and/or password"));
    const isPasswordMatch = await hashService.cmpHash(
        req.body.password,
        userData.password
    );
    if (!isPasswordMatch)
        return next(new CustomError(400,"invalid email and/or password"));
    const token = await generateToken({
        _id: userData._id,
        isBusiness: userData.isBusiness,
        isAdmin: userData.isAdmin,
    });
    res.status(200).json({ token });
})

//Edit user, authorization : The registered user, Return : The edited user
router.put("/:id", loggedInMiddleware, permissionsMiddleware(false,false,false,true), async (req, res) => {
    await usersValidationService.registerUserValidation(req.body);
    let normalizedEditedUser = normalizeUser(req.body);
    normalizedEditedUser.password = await hashService.generateHash(normalizedEditedUser.password);
    let editResult = await usersServiceModel.updateUser(req.params.id, normalizedEditedUser);
    if(editResult){
        res.status(200).json(editResult);
    }
    else{
        res.status(400).json({msg: "Use to edit not found"});
    }
});

//Change is business status, authorization : The registered user, Return : The User
router.patch("/:id", loggedInMiddleware, permissionsMiddleware(false,false,false,true), async (req, res) => {
    await usersValidationService.userIdValidation(req.params.id);
    let businessStatusUpdateResult = await usersServiceModel.changeBusinessStatusById(req.params.id);
    if(businessStatusUpdateResult){
        res.status(200).json(businessStatusUpdateResult);
    }
    else{
        res.status(400).json({msg: "User to update not found"});
    }
})

//Delete User, Authorization : The registered User or Admin, return : The Deleted User
router.delete("/:id", loggedInMiddleware, permissionsMiddleware(false,true,false,true),async (req, res) => {
    await usersValidationService.userIdValidation(req.params.id);
    let deletedUser = await usersServiceModel.deleteUserById(req.params.id);
    if(deletedUser){
        res.status(200).json(deletedUser);
    }
    else{
        res.status(400).json({msg: "User to delete not found"});
    }
})

module.exports = router;
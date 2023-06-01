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

//Get all users, authorization : Admin, Return : array of users
router.get("/", loggedInMiddleware, permissionsMiddleware(false,true,false,false), async (req, res) => {
    let allUsers = await usersServiceModel.getAllUsers();
    res.status(200).json(allUsers);
});

//Get specific user, authorization : Admin or the user himself, Return : User
//TODO fix middleware to consider the user himself
router.get("/:id", loggedInMiddleware, permissionsMiddleware(false,true,false,true), async (req, res) => {
    await usersValidationService.userIdValidation(req.params.id);
    let wantedUser = usersServiceModel.getUserById(req.params.id)
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
    let createdUser = await usersServiceModel.registerUser(normalizedUser);
    res.status(200).json(createdUser);
});

//Login User, authorization : all, return : Encrypted token
router.post("/login", async (req,res) =>{
    await usersValidationService.loginUserValidation(req.body);
    const userData = await usersServiceModel.getUserByEmail(req.body.email);
    if (!userData) throw new CustomError("invalid email and/or password");
    const isPasswordMatch = await hashService.cmpHash(
        req.body.password,
        userData.password
    );
    if (!isPasswordMatch)
        throw new CustomError("invalid email and/or password");
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
    let editResult = await usersServiceModel.updateUser(req.params.id, normalizedEditedUser);
    res.status(200).json({editResult});
});

//Change is business status, authorization : The registered user, Return : The User
router.patch("/:id", loggedInMiddleware, permissionsMiddleware(false,false,false,true), async (req, res) => {
    await usersValidationService.userIdValidation(req.params.id);
    let businessStatusUpdateResult = await usersServiceModel.changeBusinessStatusById(req.params.id);
    res.status(200).json(businessStatusUpdateResult);
})

//Delete User, Authorization : The registered User or Admin, return : The Deleted User
router.delete("/:id", loggedInMiddleware, permissionsMiddleware(false,true,false,true),async (req, res) => {
    await usersValidationService.userIdValidation(req.params.id);
    let deletedUser = await usersServiceModel.deleteUserById(req.params.id);
    res.status(200).json(deletedUser);
})


module.exports = router;
const express = require("express");
const router = express.Router();

const usersRouter = require("./api/users");
const cardsRouter = require("./api/cards");
const errorHandler = require("../utils/errorHandlerService");

//http://localhost:8181/api/cards
router.use("/cards", cardsRouter);

//http://localhost:8181/api/auth/
router.use("/users", usersRouter);

router.use((req, res, next) => {
    res.status(404).json({ err: "api not found" });
});

router.use((error, req, res, next) => {
    console.log("error", error);
    errorHandler(res, 500, "Internal server error occured");
});


module.exports = router;

const express = require("express");
const router = express.Router();

//Get all cards, authorization : all, return : All Cards
router.get("/", (req, res) => {
    console.log("in cards get");
    res.json({ msg: "in cards get" });
});

//Get my cards, authorization : The Registered User, return : Array of users cards
router.get("/my-cards", (req,res) =>{
    console.log("in cards get my cards");
    res.json({ msg: "in cards get my cards" });
})

//Get card by id, authorization : all, Return : The card
router.get("/:id", (req, res) => {
    const idValue = 111;
    console.log(req.params.id);
    console.log("are ids equal ");
    console.log(idValue == req.params.id);
    console.log("in cards get params");
    res.json({ msg: "in cards get params" });
});

//Create new card, authorization : Business User, Return : The new card
router.post("/", (req,res) => {
    console.log("in cards post");
    res.json({msg: "in cards post"});
});

//Edit card, authorization : User who created the card, Return : The edited card
router.put("/:id", (req, res) => {
    const idValue = 111;
    console.log(req.params.id);
    console.log("are ids equal ");
    console.log(idValue == req.params.id);
    console.log("in cards put");
    res.send("in cards put");
    //res.json({msg: "in cards put"});
})

//Like card, authorization : The User is registered, Return : The Liked Card
router.patch("/:id", (req, res) => {
    const idValue = 111;
    console.log(req.params.id);
    console.log("are ids equal ");
    console.log(idValue == req.params.id);
    console.log("in cards patch");
    res.send("in cards patch");
    //res.json({msg: "in cards put"});
})

//Delete Card, Authorization : The User who created the card, or admin, return : The Deleted Card
router.delete("/:id", (req, res) => {
    const idValue = 111;
    console.log(req.params.id);
    console.log("are ids equal ");
    console.log(idValue == req.params.id);
    console.log("in cards delete");
    res.send("in cards delete");
    //res.json({msg: "in cards put"});
})


module.exports = router;
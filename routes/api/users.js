const express = require("express");
const router = express.Router();

//Get all users, authorization : Admin, Return : array of users
router.get("/", (req, res) => {
    console.log("in users get all users");
    res.json({ msg: "in users get all users" });
});

//Get specific user, authorization : Admin or registered user, Return : User
router.get("/:id", (req, res) => {
    const idValue = 111;
    console.log(req.params.id);
    console.log("are ids equal ");
    console.log(idValue == req.params.id);
    console.log("in users get all users");
    res.json({ msg: "in users get all users" });
});

//Register User, authorization : all, return : registered user, needs unique email
router.post("/", (req, res) => {
    console.log("in users post register ");
    res.json({ msg: "in users post register " });
});

//Login User, authorization : all, return : Encrypted token
router.post("/login", (req,res) =>{
    console.log("in users post login");
    res.json({ msg: "in users post login" });
})

//Edit user, authorization : The registered user, Return : The edited user
router.put("/:id", (req, res) => {
    const idValue = 111;
    console.log(req.params.id);
    console.log("are ids equal ");
    console.log(idValue == req.params.id);
    console.log("in users put, Edit User");
    res.send("in users put, Edit User");
    //res.json({msg: "in cards put"});
})

//Change is business status, authorization : The registered user, Return : The User
router.patch("/:id", (req, res) => {
    const idValue = 111;
    console.log(req.params.id);
    console.log("are ids equal ");
    console.log(idValue == req.params.id);
    console.log("in users patch");
    res.send("in users patch");
    //res.json({msg: "in cards put"});
})

//Delete User, Authorization : The registered User or Admin, return : The Deleted User
router.delete("/:id", (req, res) => {
    const idValue = 111;
    console.log(req.params.id);
    console.log("are ids equal ");
    console.log(idValue == req.params.id);
    console.log("in users delete");
    res.send("in users delete");
    //res.json({msg: "in cards put"});
})


module.exports = router;
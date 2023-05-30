const express = require("express");
const corsApp = express();
const cors = require("cors");

corsApp.use(cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:3000"],
    optionsSuccessStatus: 200
}));

module.exports = corsApp;


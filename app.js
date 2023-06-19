var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const loggerAdaptor = require("./utils/logger/loggerAdaptor");
const corsRouter = require("./utils/cors/cors");
const apiRouter = require("./routes/api");
const initialData = require("./initialData/initialData");

var app = express();

app.use(loggerAdaptor());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(corsRouter);
app.use("/api", apiRouter);
app.use(express.static(path.join(__dirname, 'public')));
initialData();

module.exports = app;

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const loggerAdaptor = require("./utils/logger/loggerAdaptor");
const corsRouter = require("./utils/cors/cors");
const apiRouter = require("./routes/api");
const initialData = require("./initialData/initialData");

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(loggerAdaptor());
app.use(corsRouter);

app.use("/api", apiRouter);
initialData();



module.exports = app;

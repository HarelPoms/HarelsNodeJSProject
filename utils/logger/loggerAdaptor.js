const morganLogger = require("./loggers/morgan");
const LOGGER = "morgan";
let loggerApp = null;

if(LOGGER == "morgan"){
    loggerApp = morganLogger;
}

module.exports = loggerApp;

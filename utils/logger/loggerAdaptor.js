const morganLogger = require("./loggers/morgan");
const config = require("config");
const LOGGER = config.get("loggerOption");
let loggerApp = null;

if(LOGGER == "morgan"){
    loggerApp = morganLogger;
}

module.exports = loggerApp;

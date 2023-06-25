const morgan = require("morgan");
const chalk = require("chalk");
// const logDirMaker = require("../../fileLoggers/makeLogDir");
// const logMaker = require("../../fileLoggers/createLog");
// const dateGenerator = require("../../fileLoggers/dateGenerator");
const fileLoggerService = require("../../fileLoggers/fileLoggerService");

fileLoggerService.createLogFolderService();

const logger = () => {
        return morgan((tokens,req,res) => {
        let logArray = [
            tokens.date(req, res),
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens["response-time"](req, res),
            "ms"
        ];
        let currentDate = fileLoggerService.createDateService();
        // let currentDate = dateGenerator.generateDate();

        let resStatus = tokens.status(req,res);
        if(resStatus >= 400){
            fileLoggerService.createLogService(currentDate + ".txt", logArray.join(" ") + "\n");
            //logMaker.createLog(currentDate + ".txt", logArray.join(" ") + "\n");
            return chalk.redBright(logArray.join(" "));
        }
        else{
            return chalk.cyanBright(logArray.join(" "));
        } 
    })
};

module.exports = logger;
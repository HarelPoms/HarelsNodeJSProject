const morgan = require("morgan");
const chalk = require("chalk");
const fileLoggerService = require("../../fileLoggers/fileLoggerService");
const logDateStampMaker = require("../../logDateStampMaker");

fileLoggerService.createLogFolderService();

const logger = () => {
        morgan.token('date', () => {
            return( logDateStampMaker.makeLogDateStamp() );
        });
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
        let resStatus = tokens.status(req,res);
        if(resStatus >= 400){
            fileLoggerService.createLogService(currentDate + ".txt", logArray.join(" ") + "\n");
            return chalk.redBright(logArray.join(" "));
        }
        else{
            return chalk.cyanBright(logArray.join(" "));
        } 
    })
};

module.exports = logger;
const morgan = require("morgan");
const chalk = require("chalk");
const logDirMaker = require("../../../utils/fileLogger/makeLogDir");
const logMaker = require("../../../utils/fileLogger/createLog");

logDirMaker.createLogDir();

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
        const date = new Date();

        let currentDay= String(date.getDate()).padStart(2, '0');
        let currentMonth = String(date.getMonth()+1).padStart(2,"0");
        let currentYear = date.getFullYear();
        let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;

        let resStatus = tokens.status(req,res);
        if(resStatus >= 400){
            logMaker.createLog(currentDate + ".txt", logArray.join(" ") + "\n");
            return chalk.redBright(logArray.join(" "));
        }
        else{
            return chalk.cyanBright(logArray.join(" "));
        } 
    })
};

module.exports = logger;
const morgan = require("morgan");
const chalk = require("chalk");

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
        let resStatus = tokens.status(req,res);
        if(resStatus >= 400){
            return chalk.redBright(logArray.join(" "));
        }
        else{
            return chalk.cyanBright(logArray.join(" "));
        } 
    })
};

module.exports = logger;
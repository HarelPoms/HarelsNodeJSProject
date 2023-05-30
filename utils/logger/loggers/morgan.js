const morgan = require("morgan");
const chalk = require("chalk");

const logger = () => {
        return morgan((tokens,req,res) => {
        let resStatus = tokens.status(req,res);
        if(resStatus >= 400){
            return chalk.redBright([
            new Date(),
            tokens.method(req,res),
            tokens.url(req,res),
            tokens.status(req,res),
            "-",
            tokens["response-time"](req,res),
            "ms",].join(" "));
            
        }
        else{
            return chalk.cyanBright([
            new Date().toISOString(),
            tokens.method(req,res),
            tokens.url(req,res),
            tokens.status(req,res),
            "-",
            tokens["response-time"](req,res),
            "ms",].join(" "));
        } 
    })
};

module.exports = logger;
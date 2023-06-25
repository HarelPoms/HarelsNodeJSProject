const basicCreateLog = require("./basicTextFileLogger/createLog");
const basicFolderCreate = require("./basicTextFileLogger/makeLogDir");
const basicDateGenerator = require("./basicTextFileLogger/dateGenerator");

const logVariant = "BASIC";

const createLogService = (logName, logContent) => {
    if(logVariant === "BASIC"){
        return basicCreateLog.createLog(logName,logContent);
    }
}

const createLogFolderService = () =>{
    if(logVariant === "BASIC"){
        return basicFolderCreate.createLogDir();
    }
}

const createDateService = () => {
    if(logVariant === "BASIC"){
        return basicDateGenerator.generateDate();
    }
}

module.exports = {
    createDateService, createLogFolderService, createLogService
}
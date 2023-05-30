const basicErrorHandlerService = require("./errorHandler/basic/basicErrorHandlerService");
const config = require("config");
const errorHandlerOption = config.get("errorHandlerOption");

const handleErrorService = (res, status, msg="") => {
    if(errorHandlerOption == "basic"){
        return basicErrorHandlerService.basicHandleError(res,status,msg);
    }
};

module.exports = handleErrorService;
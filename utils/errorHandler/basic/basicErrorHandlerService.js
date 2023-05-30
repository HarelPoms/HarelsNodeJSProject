const basicErrorHandlerFunc = require("./errorHandler");

const basicHandleError = (res, status, msg="") => {
    return basicErrorHandlerFunc(res, status, msg);
};

module.exports = {basicHandleError};



const chalk = require("chalk");

const handleError = (res, status, msg="") => {
    console.log(chalk.redBright(msg));
    res.status(status).json({ msg: msg });
    return status;
}

module.exports = handleError;
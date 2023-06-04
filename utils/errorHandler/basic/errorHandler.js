const chalk = require("chalk");

const handleError = (res, status, msg="") => {
    console.log(chalk.redBright(msg));
    return res.status(status).json({ msg: msg });
}

module.exports = handleError;
const { writeFile } = require("fs/promises");
const { join } = require("path");

const createLog = async (logName, logContent)=> {
    try {
        await writeFile(join(__dirname,"logs", logName), logContent, {flag: 'a'});
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    createLog
}
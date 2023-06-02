const config = require("config");
const mongoose = require("mongoose");
const chalk = require("chalk");

console.log(chalk.yellowBright("Connection string", config.get("dbConfig.url")));

const connectToDB = () => {
    return mongoose.connect(config.get("dbConfig.url"));
};

module.exports = connectToDB;
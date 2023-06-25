const {mkdir} = require("fs/promises");
const { join } = require("path");

const createLogDir = async ()=> {
    try{
        await mkdir(join(__dirname, "logs"));
    }
    catch (err){
        //console.log("err", err);
    }
}

module.exports = {
    createLogDir
}
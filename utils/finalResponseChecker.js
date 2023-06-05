const finalCheck = (res, resultObject, errCode, msg) => {
    if(resultObject){
        res.status(200).json(resultObject);
    }
    else{
        res.status(errCode).json({msg});
    }
}

module.exports = finalCheck;
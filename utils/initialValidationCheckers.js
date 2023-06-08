const initialJoiValidation = async (ValidationMethod, ObjectToValidate) => {
    try{
        await ValidationMethod(ObjectToValidate);
        return true;
    }
    catch(err){
        console.log(err);
        return false;
    }
}

module.exports = {
    initialJoiValidation
}
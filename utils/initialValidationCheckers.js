const initialJoiValidation = async (ValidationMethod, ObjectToValidate) => {
    try{
        await ValidationMethod(ObjectToValidate);
        return true;
    }
    catch(err){
        return false;
    }
}

module.exports = {
    initialJoiValidation
}
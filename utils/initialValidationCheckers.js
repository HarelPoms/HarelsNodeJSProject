const initialJoiValidation = async (ValidationMethod, ObjectToValidate) => {
    try{
        await ValidationMethod(ObjectToValidate);
        return [true,"No  errors"];
    }
    catch(err){
        return [false,err];
    }
}

module.exports = {
    initialJoiValidation
}
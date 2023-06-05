const Joi = require('joi');

const schema = Joi.object({
    a: Joi.number()
});

const testValue = {
    a: 'fgd'
};

const testJoi = async () => {
    try {
        const value = await schema.validateAsync(testValue);
        // value -> { "a" : 123 }
    }
    catch (err) {
        console.log("Error happened");
        console.log(err);
    }
}

testJoi();

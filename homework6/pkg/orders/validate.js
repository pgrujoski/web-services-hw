const { Validator } = require("node-input-validator");

const orderPOST = {
    order: "required|string",
    location: "required|string",
    paymentType: "required|string",

};

const orderPUT = {
    order: "required|string",
    location: "required|string",
    paymentType: "required|string",
};

const validate = async(data, schema) => {
    let v = new Validator(data, schema);
    let e = v.check();
    if(!e){
        throw{
            code: 400,
            error: v.error,
        };
    }
};

module.exports ={
    orderPOST,
    orderPUT,
    validate
}
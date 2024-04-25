const { Validator } = require("node-input-validator");

const userSignUp = { 
    firstName: "required|string",
    familyName: "required|string",
    birthday: "required|string",
    address: "required|string",
    email: "required|email",
    password: "required|string"
}

const UserLogin = {
    email: "required|email",
    password: "required|string"
}

const validate = async (data, schema) => {


    let v = new Validator(data, schema);
    let e = v.check(); 
    if(!e){
        throw{
            code: 400,
            error: v.errors,
        }
    }
};

module.exports = {
    userSignUp,
    UserLogin,
    validate
}
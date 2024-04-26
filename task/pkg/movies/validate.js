const { Validator } = require("node-input-validator");

const moviePOST = {
    title: "required|string",
    genre: "required|string",
    releaseYear: "required|string",


};

const moviePUT = {
    title: "required|string",
    genre: "required|string",
    releaseYear: "required|string",
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
    moviePOST,
    moviePUT,
    validate
}
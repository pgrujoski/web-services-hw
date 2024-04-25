const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
    UserLogin,
    userSignUp,
    validate
} = require("../pkg/users/validate");

const users = require("../pkg/users");
const config = require("../pkg/config");

const register = async(req, res) => {
    try{
        await validate(req.body, userSignUp);
        const exists = await users.getByEmail(req.body.email);
        if(exists){
            return res.status(400).send("User with this email already exists!");
        }
        req.body.password = bcrypt.hashSync(req.body.password);
        const usr = await users.create(req.body);
        return res.status(201).send(usr);
    }catch(err){
        console.log(err);
        return res.status(err.status).send(err.error);
    }
}

const login = async(req, res) => {
    try{
        await validate(req.body, UserLogin);

        const {email, password} = req.body;

        const user = await users.getByEmail(email);

        if (!user){
            return res.status(400).send("User not found!");
        }

        if(!bcrypt.compareSync(password, user.password)){
            return res.status(400).send("Incorect password");
        }

        const payload = {
            
            firstName: user.firstName,
            familyName: user.familyName,
            birthday: user.birthday,
            address: user.address,
            email: user.email,
            id: user._id,
            expiry: new Date().getTime()/ 1000 + 7 * 24 * 60 * 60
        }
        const token = jwt.sign(payload, config.getSection("development").jwt);
        return res.status(200).send(token);

    }catch(err){
        console.log(err);
        return res.status(err.status).send(err.error);
    }
}

module.exports = {
    login,
    register
}
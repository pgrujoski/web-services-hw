const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: String,
    familyName: String,
    birthday: String,
    address: String,
    email: String,
    password: String
});

const User = mongoose.model("users", userSchema);


const create = async(entry) => {
    const user = new User(entry);
    return await user.save();
};

const update= async(id, newData) => {
    return await User.updateOne({ _id: id}, newData);
};

const remove = async(id) => {
    return await User.deleteOne({ _id: id});
};

const getAll = async() => {
    return await User.find({});
}

const getById = async(id) => {
    return await User.findOne({ _id: id});
}

const getByEmail = async(email) => {
    return await User.findOne( {email: email});
}

module.exports = {
    create,
    update,
    remove,
    getAll,
    getById,
    getByEmail
}
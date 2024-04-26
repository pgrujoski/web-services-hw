const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullname: String,
    username: String,
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

const getByUsername = async(username) => {
    return await User.findOne( {username: username});
}

const setNewPassword = async (id, new_password) => {
    return await User.updateOne({_id: id}, {password: new_password})
}


module.exports = {
    create,
    update,
    remove,
    getAll,
    getById,
    getByUsername,
    setNewPassword,
}
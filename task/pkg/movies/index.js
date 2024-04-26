const mongoose = require("mongoose");

const moviesSchema = mongoose.Schema({
    title: String,
    genre: String,
    releaseYear: String,
    account_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "users"
    },
    director: String,
})

const Movie = mongoose.model("movies", moviesSchema);


const getAll = async(account_id) => {
    return await Movie.find({ account_id });
};

const getOne = async(account_id, id) => {
    return await Movie.findOne( { account_id: account_id, _id: id});
};

const create = async(data) => {
    const mov = new Movie(data);
    return await mov.save();
};

const update = async(id, data) => {
    return await Movie.updateOne( {_id: id}, data );
};

const remove = async(id) => {
    return await Movie.deleteOne({ _id: id });
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
}
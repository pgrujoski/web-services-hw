const mongoose = require("mongoose");

const bikeSchema = new mongoose.Schema({
    make: {
        type: String,
        required: true,
        minLength: 2
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true,
   
    },
    power: {
        type: Number,
        required: true,
      },
    createdAt: {
        immutable: true,
        type: Date,
        default: () => Date.now(),
    },
    updatedAt:{
        type: Date,
        default: () => Date.now(),
    }
});

const Bike = mongoose.model("Bike", bikeSchema, "motorbikes");

const addBike = async(bike) => {
    const newBike = new Bike(bike);
    return await newBike.save();
};

const removeBike = async(id) => {
    return await Bike.deleteOne({ _id: id});
};

const updateBike = async(id, newBikeData) => {
    return await Bike.updateOne({ _id: id}, newBikeData); 
};

const getAllBikes = async() => {
    return await Bike.find({});
}

const getBikeById = async(id) => {
    return await Bike.findOne({ _id: id});
}

module.exports = {
    addBike,
    removeBike,
    updateBike,
    getAllBikes,
    getBikeById
}
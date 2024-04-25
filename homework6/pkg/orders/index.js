const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    order: String,
    location: String,
    paymentType: String,
    account_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "users"
    },
})

const Order = mongoose.model("orders", orderSchema);


const getAll = async(account_id) => {
    return await Order.find({ account_id });
};

const getOne = async(account_id, id) => {
    return await Order.findOne( { account_id: account_id, _id: id});
};

const create = async(data) => {
    const order = new Order(data);
    return await order.save();
};

const update = async(id, data) => {
    return await Order.updateOne( {_id: id}, data );
};

const remove = async(id) => {
    return await Order.deleteOne({ _id: id });
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
}
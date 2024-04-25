const order = require("../pkg/orders");

const {
    orderPOST,
    orderPUT,
    validate
} = require("../pkg/orders/validate");

const getAll = async(req, res) => {
    try{
        const data = await order.getAll(req.auth.id);
        return res.status(200).send(data);
    }catch(err){
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
}

const getOne = async(req, res) => {
    try{
        const data = await order.getOne(req.auth.id, req.params.id);
        if(!data){
            return res.status(404).send("Order not found");
        }
        return res.status(200).send(data);
    }catch(err){
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
}

const create = async(req, res) => {
    try{
        await validate(req.body, orderPOST);
        if(!req.auth.id){
            return res.status(400).send("Unathorized action!");
        }
        const data = {
            ...req.body,
            account_id: req.auth.id
        };
        const newOrder = await order.create(data);
        return res.status(200).send(newOrder);
    }catch(err){
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
}

const update = async(req, res) => {
    try{
        await validate(req.body, orderPUT);
        if(!req.auth.id){
            return res.status(400).send("Unathorized action!");
        }
        const data = {
            ...req.body,
            account_id: req.auth.id
        };
        await order.update(req.params.id, data);
        return res.status(200).send("Update succesfull!");
    }catch(err){
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
}

const remove = async(req, res) => {
    try{
        await order.remove(req.params.id);
        return res.status(200).send("Delete Succesfull!");
    }catch(err){
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
}
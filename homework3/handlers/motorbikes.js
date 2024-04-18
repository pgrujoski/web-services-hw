const {
    addBike,
    getAllBikes,
    getBikeById,
    updateBike,
    removeBike
} = require("../pkg/motorbikes")

const getAll = async(req, res) => {
    try{
        const bikes = await getAllBikes()
        return res.status(200).send(bikes)
    }catch(err){
        console.log(err)
        return res.status(500).send("Internal Server Error")
    }
}

const getById = async(req, res) => {
    try{
        const id = Number(req.params.id)
        const bike = await getBikeById(id)
        return res.status(200).send(bike)
    }catch(err){
        console.log(err)
        return res.status(500).send("Internal Server Error")
    }
}

const create = async(req, res) => {
    try{
        await addBike(req.body)
        return res.status(201).send(req.body)
    }catch(err){
        console.log(err)
        return res.status(500).send("Internal Server Error")
    }
}

const update = async(req, res) => {
    try{
        const id = Number(req.params.id)
        await updateBike(id, req.body)
        return res.status(204).send("")
    }catch(err){
        console.log(err)
        return res.status(500).send("Internal Server Error")
    }
}

const remove = async(req, res) => {
    try{
        const id = Number(req.params.id);
        await removeBike(id);
        return res.status(200).send("Motorbike deleted!");
    }catch(err){
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}

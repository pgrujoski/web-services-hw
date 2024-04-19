const {
    getAllBikes,
    getBikeById,
    addBike,
    removeBike,
    updateBike

} = require("../pkg/bikes/mongo");

const getAllHandler = async(req, res) => {
    try{
        const bikes = await getAllBikes();
        return res.status(200).send(bikes);
    }catch(err){
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
}

const getByIdHandler = async(req, res) => {
    try{
        const bikeFound = await getBikeById(req.params.id)
        return res.status(200).send(bikeFound);
    }catch(err){
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
}

const addHandler = async(req, res) => {
    try{
        await addBike(req.body);
        return res.status(201).send(req.body);
    }catch(err){
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
}

const updateHandler = async(req, res) => {
    try{
        await updateBike(req.params.id, req.body);
        return res.status(200).send("Motorbike updated!")
    }catch(err){
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
}

const removeHandler = async(req, res) => {
    try{
        await removeBike(req.params.id);
        return res.status(200).send("Motorbike deleted!");
    }catch(err){
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
}

module.exports = {
   addHandler,
   removeHandler,
   updateHandler,
   getAllHandler,
   getByIdHandler
}
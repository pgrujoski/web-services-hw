const {readData, writeData} = require("../files")

const DATA_SOURCE = `${__dirname}/../../motorbikes`

const addBike = async (bike) => {
    try {
        const data = await readData(DATA_SOURCE)
        data.push(bike)
        await writeData(data, DATA_SOURCE)

    }catch (err) {
        throw err
    }
}

const getAllBikes = async () => {
    try {
        const data = await readData(DATA_SOURCE)
        return data

    }catch (err) {
        throw err
    }
}

const getBikeById = async (id) => {
    try {
        const data = await readData(DATA_SOURCE)
        const bikeFound = data.find((bike) => bike.id === id)
        return bikeFound

    }catch (err) {
        throw err
    }
}

const updateBike = async (id, newBikeData) => {
    try {
        let data = await readData(DATA_SOURCE)
        const bikeFound = data.find((bike) => bike.id === id)
        if(bikeFound) {
            const newBike = {
                ...bikeFound,
                ...newBikeData
            }
        data = data.filter((bike) => bike.id !== id)
        data.push(newBike)
        await writeData(data, DATA_SOURCE)
        }else {
            console.log("Bike not found!")
        }
    }catch (err) {
        throw err
    }
}

const removeBike = async(id) => {
    try{ 
        const data = await readData(DATA_SOURCE)
        const newData = data.filter((bike)=> bike.id !== id)
        await writeData(newData, DATA_SOURCE)
    }catch(err) {
        throw err
    }
}

module.exports = {
    addBike,
    getAllBikes,
    getBikeById,
    updateBike,
    removeBike
}



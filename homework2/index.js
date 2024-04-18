const fs  = require("fs")

const motorbikes = {
    id: "string",
    model: "string",
    year: "number",
    mileage: "number"
}

const workers = {
    id: "string",
    firstName: "string",
    lastName: "string",
    proffesion: "string",
    birthYear: "number",
}

const factories = {
    id: "string",
    name: "string",
    address: "string",
    zipCode: "number",
}

const bikeParts = {
    id: "string",
    name: "string",
    price: "number",
    warranty: "boolean"
}

const apparel = {
    id: "string",
    name: "string",
    size: "string",
    price: "number",
    available: "boolean",
}

const readData = (source) => {
    return new Promise((resolve, reject) => {
        fs.readFile(`${source}.json`, "utf-8", (err, data) => {
            if(err) return reject(err)
            const out = JSON.parse(data)
            return resolve(out)
        })
    })
}

const writeData = (data, destination) => {
    return new Promise((resolve, reject) => {
        const out = JSON.stringify(data)
        fs.writeFile(`${destination}.json`, out, (err) => {
            if (err) return reject(err)
            return resolve()
        })
    })
}

const addBike = async (id, model, year, mileage) => {
    try {
        const motorbike = {
            id, 
            model,
            year,
            mileage,
        }
        let data = await readData("./motorbikes")
        data.push(motorbike)
        await writeData(data, "./motorbikes")
    } catch (err) {
        throw err
    }
}

const listOneBike = async (id) => {
    try {
        const data = await readData("./motorbikes")
        const motorbike = data.find((motorbike) => motorbike.id === id)
        return motorbike;
    } catch (err) {
        throw err
    }
}

const listAllBikes = async () => {
    try {
        const data = await readData("./motorbikes")
        return data
    } catch (err) {
        throw err
    }
}

const updateBike = async (id, newData) => {
    try {
        let data = await readData("./motorbikes")
        const motorbike = data.find((motorbike) => motorbike.id === id)
        const newBike = {
            ...motorbike, 
            ...newData,
        }
        data = data.filter((motorbike) => motorbike.id !== id)
        data.push(newBike)
        await writeData(data, "./motorbikes")
    }catch(err) {
        throw err
    }
}

const removeBike = async (id) => {
    try {
        const data = await readData("./motorbikes")
        const out = data.filter((motorbike) => motorbike.id !== id)
        await writeData(out, "./motorbikes")
    } catch(err) {
        throw err
    }
}


(async () => {
    try {
        await addBike("1", "Honda", 2020, 3000)
        await addBike("2", "Yamaha", 2021, 6500)

        const allBikes = await listAllBikes()
        console.log(allBikes)
        
        await updateBike("1", { model: "Ducati", year: 1990 })

        const oneBike  = await listOneBike("1")
        console.log(oneBike)

    
        await removeBike("2");

    } catch (err) {
        console.error("Error:", err);
    }
})();
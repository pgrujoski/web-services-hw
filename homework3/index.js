const express = require("express")
const api = express()

api.use(express.json())

const {
    getAll,
    getById,
    create,
    update,
    remove
} = require("./handlers/motorbikes")

api.get("/bikes", getAll)
api.get("/bikes/:id", getById)

api.post("/bikes", create)
api.patch("/bikes/:id", update)
api.delete("/bikes/:id", remove)

api.listen(8001, (err) => {
    err ? console.error(err) : console.log("Server started")
})


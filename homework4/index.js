const express = require("express");
const config = require("./pkg/config");
require("./pkg/db");

const {
    getAllHandler,
    getByIdHandler,
    addHandler,
    removeHandler,
    updateHandler
} = require("./handlers/bikes");

const api = express();

api.use(express.json());

api.get("/bikes", getAllHandler);
api.get("/bikes/:id", getByIdHandler);
api.post("/bikes", addHandler);
api.patch("/bikes/:id", updateHandler);
api.delete("/bikes/:id", removeHandler);

api.listen(config.getSection("development").port, (err) => {
    err 
        ? console.error(err)
        : console.log(
            `Server started at port ${config.getSection("development").port}`
        );
});
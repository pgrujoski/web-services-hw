const express = require("express");
const { expressjwt: jwt} = require("express-jwt");

const config = require("./pkg/config");
require("./pkg/db");

const { 
    login,
    register,
} = require("./handlers/users");

const{
    getAll,
    getOne,
    create,
    update,
    remove
} = require("./handlers/orders");

const api = express();

api.use(express.json());

api.use(
    jwt({
        secret: config.getSection("development").jwt,
        algorithms: ["HS256"],
    }).unless({
        path: [
            "/auth/login",
            "/auth/register",
        ],
    })
)

api.post("/auth/login", login);
api.post("/auth/register", register);
api.get("/order", getAll);
api.get("/order/:id", getOne);
api.post("/order", create);
api.put("/order/:id", update);
api.delete("/order/:id", remove);

api.use(function (err, req, res, next){
    if(err.name = "UnauthorizedAccess"){
        res.status(401).send("invalid token!");
    }
    res.status(err.status).send(err.inner.message);
});

api.listen(config.getSection("development").port, (err) => {
    err 
        ? console.error(err)
        : console.log(
            `Server started at port ${config.getSection("development").port}`
        );
});
const express = require("express");
const { expressjwt: jwt} = require("express-jwt");
const fileUpload = require("express-fileupload");

const config = require("./pkg/config");
require("./pkg/db");

const { 
    login,
    register,
    resetPassword,
    refreshToken,
} = require("./handlers/users");

const{
    getAll,
    getOne,
    create,
    update,
    remove
} = require("./handlers/movies");

const{
    upload,
    download,
    listFiles,
    removeFile
} = require("./handlers/storage")


const api = express();

api.use(express.json());
api.use(fileUpload());

api.use(
    jwt({
        secret: config.getSection("development").jwt,
        algorithms: ["HS256"],
    }).unless({
        path: [
            "/user/login",
            "/user/register",
            "/user/resetPassword",
            "/user/refreshToken",
        ],
    })
)

api.post("/user/login", login);
api.post("/user/register", register);
api.post("/user/resetPassword", resetPassword)
api.post("/user/refreshToken", refreshToken)

api.get("/movie", getAll);
api.get("/movie/:id", getOne);
api.post("/movie", create);
api.put("/movie/:id", update);
api.delete("/movie/:id", remove);

api.post("/storage", upload);
api.get("/storage/:filename", download);
api.get("/storage", listFiles);
api.delete("/storage/:filename", removeFile);


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
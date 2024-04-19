const mongoose = require("mongoose");
const config = require("../config");

const { MONGO_USERNAME, MONGO_PASSWORD } = config.getSection("development");

const uri = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@clustersemos.hovzwmd.mongodb.net/homework?retryWrites=true&w=majority`;

async function connect(){
    try{
        await mongoose.connect(uri);
    }catch(err){
        console.log(err);
    }
}

connect();

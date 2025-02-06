const mongoose = require('mongoose');

mongoose.connect(process.env.mongo_URI , {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('connected' , () => {
    console.log("connected");
});

db.on("error" , () => {
    console.log("error");
});

db.on('disconnected' , () => {
    console.log("disconnect");
});

module.exports = db;
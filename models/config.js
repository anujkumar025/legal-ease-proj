const mongoose = require('mongoose');
// const mongodb = require('require');
const connect = mongoose.connect("mongodb+srv://ffriction73:s958nczcLxp7vSsB@cluster1.erneamf.mongodb.net/?retryWrites=true&w=majority");

// Check database connected or not
// ?retryWrites=true&w=majority
// mongodb+srv://ffriction73:8ClRkF7Szkk6uMGl@cluster0.qicghgy.mongodb.net/legalEase?retryWrites=true&w=majority

connect.then(() => {
    console.log("Database Connected Successfully");
})
.catch((err) => {
    console.log(err);
})

// Create Schema
const Loginschema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    email: {
        type:String,
        requried: true
    },
    password: {
        type: String,
        required: true
    }
});

// collection part
const collection = new mongoose.model("users", Loginschema);

module.exports = collection;
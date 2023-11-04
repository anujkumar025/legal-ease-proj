const mongoose = require('mongoose');
// const mongodb = require('require');
const connect = mongoose.connect("mongodb+srv://ffriction73:UXp4VOWuKV66IOw1@cluster0.vheabqm.mongodb.net/?retryWrites=true&w=majority");

// UXp4VOWuKV66IOw1
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
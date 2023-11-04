const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const collection = require('./models/config');
const bcrypt = require('bcrypt');

const app = express()
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}));

const PORT = 5001;

app.post("/login", async (req, res) => { 
    const {email, password} = req.body;
    console.log(email + "  " + password);
    try {
        const check = await collection.findOne({ email: email});
        console.log(check);
        if (!check) {
            console.log('goodhere1')
            return res.send("User not found")
        }
        const isPasswordMatch = await bcrypt.compare(password, check.password);
        if (!isPasswordMatch) {
            return res.send("wrong Password");
        }
        else {
            console.log(check.name);
            return res.send(check.name);
        }
    }
    catch(err) {
        console.log(err);
        res.send("wrong Details");
    }
});

app.post("/register", async (req, res) => {
    let {name, email, password} = req.body;
    console.log(name, email, password);
    try{
        const existingUser = await collection.findOne({email: email});
        if (!existingUser) {
            // console.log("good here1");
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            password = hashedPassword;
            const result = await collection.create({name, email, password});
            // console.log(result);
            if (result.insertedCount === 1) {
                // console.log("good here2");
                res.send('User registered successfully.');
            }
            else {
                // console.log("good here3");
                res.send('User registration failed. Please try again.');
            }
        }
        else {
            // console.log("good here4")
            return res.send("User already registered");
        }
    }
    catch(err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(PORT, ()=>{
    console.log("started at port " + PORT);
})
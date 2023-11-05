const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const collection = require('./models/config');
const bcrypt = require('bcrypt');
const OpenAI = require('openai');
const {config} = require('dotenv');
// import OpenAI from "openai"
// import { config } from "dotenv"
const { spawn } = require('child_process');
// import { spawn } from 'child_process';
config()

const app = express()
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}));

const PORT = 5001;
const outputpath = "";

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


app.post('/chat', async (req, res)=> {
    const txtdata = JSON.stringify(req.body.txt);
    console.log(txtdata);
    const openAi = new OpenAI({   
    apiKey: "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",
})
// console.log(txtdata);
const prompt = txtdata;
const finalPrompt = `create a contract of about 200 words with the format:
*contract heading*
*brief one liner about the contract*
*terms and conditions consisting of prize money, fair play, payment and ammendment*
*signature of both the parties, signature of 1st party is "0xD83b4eB0118a3d9E02DdC4eB6f16eC0fAF8Cd495" and 2nd party is "0xd2224E74C8f5B823fD7891C111757f0d487eE8D0"*
and do not inclue date or venue.: ${prompt}`;
console.log(finalPrompt)
const chatCompletion = await openAi.chat.completions.create({
  model: "gpt-3.5-turbo-0613",
  messages: [{"role": "user", "content": finalPrompt}]
});
const contract = chatCompletion.choices[0].message.content;
console.log(contract);

// const childPython = spawn('python', ['--version']);
// const childPython = spawn('python', ['temp.py']);
const childPython = spawn('python', ['test.py', contract]);

childPython.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

childPython.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});

childPython.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});
    // outputpath = "./output.jpg"
})

// app.get('/get-image-url', (req, res) =>{
//     res.json({outputpath});
// });

app.listen(PORT, ()=>{
    console.log("started at port " + PORT);
})
import { config } from "dotenv"
// const { spawn } = require('child_process');
import { spawn } from 'child_process';
config()

import OpenAI from "openai"

const openAi = new OpenAI({   
    apiKey: process.env.API_KEY,
})

const prompt = "alok and akash have a arm wrestle competition, the loser pays the winner rupees 500"

const chatCompletion = await openAi.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [{"role": "user", "content": `create a contract of about 200 words with the format:
*contract heading*
*brief one liner about the contract*
*terms and conditions consisting of prize money, fair play, payment and ammendment*
*signature of both the parties, signature of 1st party is "0xD83b4eB0118a3d9E02DdC4eB6f16eC0fAF8Cd495" and 2nd party is "0xd2224E74C8f5B823fD7891C111757f0d487eE8D0"*
and do not inclue date or venue.:` + prompt}],
  temperature: 0.25
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


require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

const apiUrl = "https://randommer.io/api/Name?nameType=fullname&quantity=20";

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

function sendErrorCode(error) {
    throw new Error(error);
}

app.get('/names', async (req, res, next) => {
    try {
        if (!process.env.RANDOMER_API_TOKEN) {
            sendErrorCode('RANDOMER_API_TOKEN is missing. Please create a .env file in the root dir of the project and put your api key in RANDOMER_API_TOKEN variable');
        }
        const result = await axios.get(apiUrl, {
            headers: {
                'X-API-KEY': process.env.RANDOMER_API_TOKEN
            }
        });
        res.json(result.data);
    } catch (err) {
        next(err);
    }
});

app.listen(3000, () => {
    console.log("Started");
});
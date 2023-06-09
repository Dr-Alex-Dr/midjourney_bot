let axios = require('axios');
require('dotenv').config();

async function Upscale(buttonMessageId, buttonId) {
    var data = JSON.stringify({
    "button": buttonId,
    "buttonMessageId": buttonMessageId,
    "ref": "",
    "webhookOverride": 'https://c601-94-140-138-143.ngrok-free.app/upscale'
    });

    var config = {
    method: 'post',
    url: 'https://api.thenextleg.io/v2/button',
    headers: { 
        'Authorization': `Bearer ${process.env.MD}`,
        'Content-Type': 'application/json'
    },
    data : data
    };

    axios(config)
    .then(function (response) {
    console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
    console.log(error);
    }); 
                     
}


module.exports = { Upscale }
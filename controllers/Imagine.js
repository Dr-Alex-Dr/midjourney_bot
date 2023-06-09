let axios = require('axios');
require('dotenv').config();

async function Imagine(promt) {
    var data = JSON.stringify({
        "msg": promt,
        "ref": "",
        "webhookOverride": `https://midjourneybot.site/imagine`
      });
      
      var config = {
        method: 'post',
        url: 'https://api.thenextleg.io/v2/imagine',
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


module.exports = { Imagine }
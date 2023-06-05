var axios = require('axios');

// U1 
async function GetLinkImage(numberImg, buttonMessageId) {
  var data = JSON.stringify({
    "button": numberImg,
    "buttonMessageId": buttonMessageId,
    "ref": "",
    "webhookOverride": "https://4f0d-94-140-138-143.ngrok-free.app/getImg"
  });
  
  var config = {
    method: 'post',
    url: 'https://api.thenextleg.io/v2/button',
    headers: { 
      'Authorization': 'Bearer 4c20b5ff-18f1-49c2-beb6-b4a6d55761bd', 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  axios(config)
  .then(function (response) {
    
  })
  .catch(function (error) {
    console.log(error);
  }); 
}

module.exports = { GetLinkImage }
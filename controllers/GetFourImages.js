var axios = require('axios');

async function GetFourImages(promt) {
  var data = JSON.stringify({
    "msg": promt,
    "ref": "",
    "webhookOverride": "https://4f0d-94-140-138-143.ngrok-free.app/webhook"
  });
  
  var config = {
    method: 'post',
    url: 'https://api.thenextleg.io/v2/imagine',
    headers: { 
      'Authorization': 'Bearer 4c20b5ff-18f1-49c2-beb6-b4a6d55761bd', 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  axios(config)
  .then(function (response) {
    console.log(response)
  })
  .catch(function (error) {
    console.log(error);
  });
}

GetFourImages('banana');
// module.exports = { GetFourImages }
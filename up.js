const axios = require('axios');

const url = 'https://api-service.vanceai.com/web_api/v1/transform';
const apiToken = 'ef06f5a821d66e603f5b8a5b56ca3cef';
const uid = '1a01f8b050c30ba77e45b195ba16ea15';
const webhook = 'https://webhook.site/349f4e56-2d9a-400c-89b3-38d378a0aa6d';
const jconfig = {
  "job": "enlarge",
  "config": {
    "module": "enlarge",
    "module_params": {
      "model_name": "EnlargeStable",
      "suppress_noise": 26,
      "remove_blur": 26,
      "scale": "6x"
    },
    "out_params": {}
  }
};

axios({
  method: 'post',
  url: url,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data: `api_token=${apiToken}&uid=${uid}&webhook=${webhook}&jconfig=${JSON.stringify(jconfig)}`
})
.then(function (response) {
  console.log(response.data);
})
.catch(function (error) {
  console.log(error);
});

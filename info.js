const axios = require('axios');

const apiUrl = 'https://api-service.vanceai.com/web_api/v1/point';
const apiToken = 'ef06f5a821d66e603f5b8a5b56ca3cef';

axios.get(apiUrl, {
  params: {
    api_token: apiToken
  }
})
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error occurred:', error.message);
  });

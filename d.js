const axios = require('axios');
const fs = require('fs');

const apiUrl = 'https://api-service.vanceai.com/web_api/v1/download';
const outputFilePath = 'enlarged-cat.jpg';
const apiToken = 'ef06f5a821d66e603f5b8a5b56ca3cef';
const transId = '3a331f5092557f3f8134f5d4977fb338';

const postData = new URLSearchParams();
postData.append('api_token', apiToken);
postData.append('trans_id', transId);

axios.post(apiUrl, postData, { responseType: 'stream' })
  .then(response => {
    response.data.pipe(fs.createWriteStream(outputFilePath));
  })
  .catch(error => {
    console.error('Error occurred:', error.message);
  });

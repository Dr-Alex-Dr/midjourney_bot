const axios = require('axios');

const apiUrl = 'https://deep-image.ai/rest_api/process_result';
const apiKey = 'adea4430-308c-11ee-bb03-c70441be604f';

const requestData = {
  enhancements: ['denoise', 'deblur', 'light'],
  url: 'https://deep-image.ai/api-example.png',
  width: 2000,
};

const headers = {
  'content-type': 'application/json',
  'x-api-key': apiKey,
};

axios
  .post(apiUrl, requestData, { headers })
  .then((response) => {
    console.log('Response:', response.data);
  })
  .catch((error) => {
    console.error('Error:', error.message);
  });

const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const url = 'https://api-service.vanceai.com/web_api/v1/upload';
const apiToken = 'ef06f5a821d66e603f5b8a5b56ca3cef';
const filePath = './foldersImages/204.jpg';

const formData = new FormData();
formData.append('api_token', apiToken);
formData.append('file', fs.createReadStream(filePath), {
  filename: '204.jpg'
});

axios({
  method: 'post',
  url: url,
  headers: {
    ...formData.getHeaders()
  },
  data: formData
})
.then(function (response) {
  console.log(response.data);
})
.catch(function (error) {
  console.log(error);
});

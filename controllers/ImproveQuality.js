const axios = require('axios');
const FormData = require('form-data');
const { DownloadImage } = require('./DownloadImage');
require('dotenv').config();

function ImproveQuality(imageUrl, nameImg, originalPromt, index) {
  const form = new FormData();
  form.append('image', imageUrl);
  //form.append('size', '4');

  axios({
    method: 'post',
    url: 'https://api.deepai.org/api/torch-srgan',
    headers: {
      'api-key': 'e55129f0-29b9-44aa-9146-f2b3062e2b69',
    },
    data: form,
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
  })
  .then((response) => {
    DownloadImage(response.data.output_url, nameImg, originalPromt, index)
    console.log(response.data);
    process.env.BOT_TOKEN = 0;
  })
  .catch((error) => {
    console.log(error);
    process.env.BOT_TOKEN = 1;
  });
}

//ImproveQuality('https://cdn.discordapp.com/attachments/1008571116241047642/1123933142869360670/sancho6426_woman_in_his_50s_happy_looking_at_camera_colored_bac_bebbc6e7-5d3b-4517-b967-5f137f7007c9.png');
module.exports = { ImproveQuality }

const axios = require('axios');
const FormData = require('form-data');
require('dotenv').config();

async function ImproveQuality(imageUrl, imageSize) {
  return new Promise((resolve, reject) => {
    const form = new FormData();
    form.append('image', imageUrl);
  
    axios({
      method: 'post',
      url: 'https://api.deepai.org/api/torch-srgan',
      headers: {
        'api-key': 'e55129f0-29b9-44aa-9146-f2b3062e2b69',
      },
      data: form,
      params: {
        size: imageSize,
      },
    })
    .then((response) => {
      console.log('обработаное изображение: ', response.data.output_url);
      resolve(response.data.output_url);
    })
    .catch((error) => {
      reject(error);
    });
  })
}

//ImproveQuality('https://cdn.discordapp.com/attachments/1008571116241047642/1123933142869360670/sancho6426_woman_in_his_50s_happy_looking_at_camera_colored_bac_bebbc6e7-5d3b-4517-b967-5f137f7007c9.png');
module.exports = { ImproveQuality }

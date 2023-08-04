const axios = require('axios');
const FormData = require('form-data');

const form = new FormData();
form.append('image', 'https://s0.rbk.ru/v6_top_pics/media/img/8/54/756578114959548.jpg');

axios({
  method: 'post',
  url: 'https://api.deepai.org/api/torch-srgan',
  headers: {
    'api-key': 'e55129f0-29b9-44aa-9146-f2b3062e2b69',
  },
  data: form,
  params: {
    size: 2,
  },
})
.then((response) => {
  console.log(response.data);
})
.catch((error) => {
  console.log(error);
});

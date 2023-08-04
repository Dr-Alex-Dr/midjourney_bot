const axios = require('axios');
require('dotenv').config();

function YandexTranslate(text) {
    return new Promise((resolve, reject) => {
        const IAM_TOKEN = 'AQVN3AYP80vFzYbXUv95ixh3hYpez-hAcjhyMO2U';
        const folder_id = 'b1gq9ne59dk6m0vedn8o';
        const target_language = 'en';
        const texts = text;
    
        const body = {
            targetLanguageCode: target_language,
            texts: texts,
            folderId: folder_id
        };
    
        const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Api-Key ${IAM_TOKEN}`
        };
    
        axios.post('https://translate.api.cloud.yandex.net/translate/v2/translate', body, { headers })
        .then(response => {
            resolve(response.data.translations[0].text)         
        })
        .catch(error => {
            console.error(error);
        });
    })
}

module.exports = { YandexTranslate }

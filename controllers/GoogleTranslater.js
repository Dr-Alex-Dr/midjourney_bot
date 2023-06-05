const { Translate } = require('@google-cloud/translate').v2;

// Путь к файлу credentials.json
const credentialsPath = '../credentials.json';

// Создаем клиент Google Translate API с использованием файла credentials.json
const translate = new Translate({
  credentials: require(credentialsPath),
});

// Функция для перевода текста
async function GoogleTranslater(text) {
    // Опции для перевода
    const options = {
        from: 'ru',
        to: 'en',
    };

  try {
    const [translation] = await translate.translate(text, options);
    return translation;
  } catch (err) {
    console.error('Произошла ошибка:', err);
  }
};

module.exports = { GoogleTranslater }

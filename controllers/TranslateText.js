const translatte = require('translatte');

async function TranslateText(string) {

    // Проверяем наличие символов "--" в строке
  if (!string.includes("--")) {
    let result = await translatte(string, { to: 'en' });
    return result.text;
  }

    // Разделяем строку по символу "--"
    let parts = string.split("--");

    // Получаем первую часть строки до "--"
    let prefix = parts.shift().trim();

    // Получаем остаток строки после разделителей "--"
    let suffix = "--" + parts.join("--").trim();

    let result = await translatte(prefix, {to: 'en'})
    return result.text + " " + suffix
}

module.exports = { TranslateText }
const { YandexTranslate } = require('./YandexTranslate');

async function TranslateText(string) {
    // Удаление числа с цифрой в начале строки
    string = string.replace(/^\d+\.\s*/, '');

    // Удаление точки в конце строки
    string = string.replace(/\.\s*$/, '');

    // Проверяем наличие символов "--" в строке
  if (!string.includes("--")) {
    let result = await YandexTranslate(string);  
    const modifiedText = result.replace(/-/g, '');
    return modifiedText;
  }

    // Разделяем строку по символу "--"
    let parts = string.split("--");

    // Получаем первую часть строки до "--"
    let prefix = parts.shift().trim();

    // Получаем остаток строки после разделителей "--"
    let suffix = "--" + parts.join("--").trim();

    let result = await YandexTranslate(prefix)
    return result + " " + suffix
}

module.exports = { TranslateText }
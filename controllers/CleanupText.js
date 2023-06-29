function CleanupText(text) {

  text = text.replace(/—/g, "--");
  // Удаление символов +=[]:*?;«,./\<>|
  const cleanedText = text.replace(/[+=\[\]:*?;«,\.\/\\<>\|]/g, '');

  // Удаление цифр из начала строки
  const textWithoutDigits = cleanedText.replace(/^\d+/, '');

  // Удаление текста после символа --
  const textBeforeDash = textWithoutDigits.split('--')[0];

  // Удаление лишних пробелов
  const trimmedText = textBeforeDash.trim().replace(/\s+/g, ' ');

  return trimmedText;
}


module.exports = { CleanupText }
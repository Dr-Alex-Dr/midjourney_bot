function CleanupText(text) {
// Удаление символов +=[]:*?;«,./\<>|
  const cleanedText = text.replace(/[+=\[\]:*?;«,\.\/\\<>\|]/g, '');

  // Удаление текста после символа --
  const textBeforeDash = cleanedText.split('--')[0];

  // Удаление лишних пробелов
  const trimmedText = textBeforeDash.trim().replace(/\s+/g, ' ');

  return trimmedText;
}


module.exports = { CleanupText }
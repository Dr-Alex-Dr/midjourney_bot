function cleanupText(input) {
  // Удаление символов +=[]:*?;«,./\<>|
  const cleanedText = input.replace(/[+=\[\]:*?;«,\.\/\\<>\|]/g, '');

  // Удаление текста после символа --
  const textBeforeDash = cleanedText.split('--')[0];

  // Удаление лишних пробелов
  const trimmedText = textBeforeDash.trim().replace(/\s+/g, ' ');

  return trimmedText;
}

// Пример использования
const inputText = 'Это :строка +=[], которую нужно: "очистить" -- и удалить лишние  пробелы.';
const cleanedText = cleanupText(inputText);
console.log(cleanupText('Это :строка +=[], которую нужно: "очистить" -- и удалить лишние  пробелы.'));

const { google } = require('googleapis');
const auth = new google.auth.GoogleAuth({
  keyFile: 'credentials.json', // Путь к файлу с учетными данными
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

async function GoogleSheets(links) 
{
  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });

  try {
    const spreadsheetId = '1XT_wGrWpjs2HrkgZ1j8J1Yiauk8Le4DQhRKagpM_HZM'; // Замените на идентификатор своей таблицы
    const range = 'A1:B20'; // Замените на нужный диапазон ячеек
    const values = links;
  
      const resource = {
        values,
      };
  
      const response = await sheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: 'RAW',
        resource,
      });
  
      console.log('Данные успешно записаны в таблицу:', response.data);
    } catch (err) {
      console.error('Произошла ошибка:', err);
    }
  };


module.exports = { GoogleSheets }

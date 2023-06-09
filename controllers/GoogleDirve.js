const fs = require('fs');
const { google } = require('googleapis');
const { GoogleSheets } = require('./GoogleSheets')
const auth = new google.auth.GoogleAuth({
  keyFile: 'credentials.json', // Путь к файлу с учетными данными
  scopes: ['https://www.googleapis.com/auth/drive'],
});

async function GoogleDirve(folderPath, folderName)
{
  const client = await auth.getClient();
  const drive = google.drive({ version: 'v3', auth: client });

  try {
    const parentFolderId = '1IqFM9xTfP1LyLs77S7mH_4_Ln3wmYwXV'; // ID родительской папки, в которую хотите загрузить папку

    const folderId = await createFolder(`${folderName} ${Math.floor(Math.random() * (99999 - 1 + 1)) + 1}`, parentFolderId, drive);

    const uploadedFiles = await uploadFolder(folderPath, folderId, drive);

    const viewLinks = await getPublicViewLinks(uploadedFiles, drive, folderName, folderPath);


  } catch (err) {
    console.error('Произошла ошибка:', err);
  }
};

const createFolder = async (folderName, parentFolderId, drive) => {
  const fileMetadata = {
    name: folderName,
    mimeType: 'application/vnd.google-apps.folder',
    parents: [parentFolderId],
  };

  const response = await drive.files.create({
    resource: fileMetadata,
    fields: 'id',
  });

  return response.data.id;
};

const uploadFolder = async (folderPath, folderId, drive) => {
  const files = fs.readdirSync(folderPath);
  const uploadedFiles = [];

  for (const file of files) {
    const filePath = `${folderPath}/${file}`;
    const fileStat = fs.statSync(filePath);

    if (fileStat.isFile()) {
      const fileId = await uploadFile(filePath, folderId, drive);
      uploadedFiles.push(fileId);
    } else if (fileStat.isDirectory()) {
      const subFolderName = file;
      const subFolderId = await createFolder(subFolderName, folderId, drive);
      const subFolderUploadedFiles = await uploadFolder(filePath, subFolderId, drive);
      uploadedFiles.push(...subFolderUploadedFiles);
    }
  }

  return uploadedFiles;
};

const uploadFile = async (filePath, folderId, drive) => {
  const fileMetadata = {
    name: filePath.split('/').pop(),
    parents: [folderId],
  };

  const media = {
    mimeType: 'application/octet-stream',
    body: fs.createReadStream(filePath),
  };

  const response = await drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: 'id',
  });

  return response.data.id;
};

const getPublicViewLinks = async (fileIds, drive, folderName, folderPath) => {
  const viewLinks = [];

  for (const fileId of fileIds) {
    const permission = {
      type: 'anyone',
      role: 'reader',
    };

    await drive.permissions.create({
      fileId: fileId,
      requestBody: permission,
    });

    const response = await drive.files.get({
      fileId: fileId,
      fields: 'webViewLink',
    });

    const viewLink = response.data.webViewLink;
    viewLinks.push(viewLink);
    GoogleSheets([
      [viewLink, folderName],
      [viewLink, folderName],
      [viewLink, folderName],
      [viewLink, folderName]
    ])
    
    if (viewLinks.length == 4) {
      console.log(viewLinks);
      fs.remove(folderPath)
      .then(() => {
        console.log('Папка успешно удалена.');
      })
      .catch((err) => {
        console.error('Ошибка при удалении папки:', err);
      });
      }
  }
};


module.exports = { GoogleDirve }
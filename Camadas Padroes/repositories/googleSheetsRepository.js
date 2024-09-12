const { google } = require('googleapis');
const path = require('path');

const authenticate = async () => {
    const auth = new google.auth.GoogleAuth({
        keyFile: path.join(__dirname, '../credentials.json'),
        scopes: 'https://www.googleapis.com/auth/spreadsheets',
    });

    return await auth.getClient();
};

exports.insertDataIntoSheet = async (data) => {
    const client = await authenticate();
    const googleSheets = google.sheets({ version: 'v4', auth: client });
    const spreadsheetId = '1NbSjkLZlSUlwoUI-iaPfPIUgixi4-aXuT7Ce_VAR3IA';

    await googleSheets.spreadsheets.values.append({
        auth: client,
        spreadsheetId,
        range: 'Folha1!A:B',
        valueInputOption: 'USER-ENTERED',
        resource: {
            values: [
                [data.name, data.email]
            ],
        },
    });
};

exports.readSheet = async () => {
    const client = await authenticate();
    const googleSheets = google.sheets({ version: 'v4', auth: client });
    const spreadsheetId = '1NbSjkLZlSUlwoUI-iaPfPIUgixi4-aXuT7Ce_EIR0BU';

    const getRows = await googleSheets.spreadsheets.values.get({
        auth: client,
        spreadsheetId,
        range: 'Folha1!A:B',
    });

    return getRows.data.values;
};

const express = require('express');
const { google } = require('googleapis');

const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: 'credentials.json',
            scopes: 'https://www.googleapis.com/auth/spreadsheets',
        });

        const client = await auth.getClient();

        const googleSheets = google.sheets({ version: 'v4', auth: client });

        const spreadsheetId = '1NbSjkLZlSUlwoUI-iaPfPIUgixi4-aXuT7Ce_EIR0BU';

        const metaData = await googleSheets.spreadsheets.get({
            auth,
            spreadsheetId,
        });

        const getRows = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: 'Folha1',
        });

        // Escrever linhas na spreadsheet
        await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: 'Folha1!A:B',
            valueInputOption: 'USER-ENTERED',
            resource: {
                values: [
                    ['test', 'test2']
                ],
            },
        });

        res.send(getRows.data);
    } catch (error) {
        console.error('Error fetching spreadsheet metadata:', error);
        res.status(500).send('Error fetching spreadsheet metadata');
    }
});

app.listen(2000, () => console.log('Teste'));

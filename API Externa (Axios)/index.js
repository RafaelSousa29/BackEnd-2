const express = require('express');
const { google } = require('googleapis');
const axios = require('axios'); 

const app = express();

app.use(express.json());

app.get('/cep/:cep', async (req, res) => {
    const { cep } = req.params;

    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const address = response.data;

        if (address.erro) {
            return res.status(404).json({ message: 'CEP não encontrado' });
        }

        return res.json(address);
    } catch (error) {
        console.error('Erro ao buscar o CEP:', error);
        return res.status(500).json({ message: 'Erro ao encontrar o CEP' });
    }
});

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
        console.error('Erro metadata spreadsheet:', error);
        res.status(500).send('Erro metadata spreadsheet');
    }
});

app.listen(2000, () => console.log('Servidor rodando na porta 2000'));

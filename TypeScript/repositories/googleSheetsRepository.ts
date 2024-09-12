import { google } from 'googleapis';
import path from 'path';

interface UserData {
    name: string;
    email: string;
}

const authenticate = async () => {
    const auth = new google.auth.GoogleAuth({
        keyFile: path.join(__dirname, '../credentials.json'),
        scopes: 'https://www.googleapis.com/auth/spreadsheets',
    });

    return await auth.getClient();
};

export const insertDataIntoSheet = async (data: UserData): Promise<void> => {
    const client = await authenticate();
    const googleSheets = google.sheets({ version: 'v4', auth: client });
    const spreadsheetId = '1NbSjkLZlSUlwoUI-iaPfPIUgixi4-aXuT7Ce_VAR3IA';

    await googleSheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'Folha1!A:B',
        valueInputOption: 'USER-ENTERED',
        resource: {
            values: [[data.name, data.email]],
        },
    });
};

export const readSheet = async (): Promise<Array<Array<string>>> => {
    const client = await authenticate();
    const googleSheets = google.sheets({ version: 'v4', auth: client });
    const spreadsheetId = '1NbSjkLZlSUlwoUI-iaPfPIUgixi4-aXuT7Ce_EIR0BU';

    const response = await googleSheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'Folha1!A:B',
    });

    return response.data.values || [];
};

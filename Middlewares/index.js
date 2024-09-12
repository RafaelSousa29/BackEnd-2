const express = require('express');
const { google } = require('googleapis');
const app = express();
app.use(express.json());

// Middleware de Logging
const logUserObject = (req, res, next) => {
    if (req.method === 'POST' || req.method === 'PUT') {
        console.log('Dados do usuário recebidos (req.body):', req.body);
    } else if (req.method === 'GET') {
        console.log('Dados do usuário recebidos (req.query):', req.query);
    }
    next();
};

// Middleware de Autenticação Simples
const authenticateUser = (req, res, next) => {
    const { username, password } = req.query;
    const users = [
        { username: 'admin', password: '1234' }, 
        { username: 'user', password: 'abcd' }
    ];
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        req.user = user;
        next();
    } else {
        res.status(401).send('Credenciais inválidas. Tente novamente.');
    }
};

// Middleware de logging global
app.use(logUserObject);

// Middleware de requisição 
app.use((req, res, next) => {
    console.log(`Requisição recebida: ${req.method} ${req.path}`);
    next();
});

const insertDataIntoSheet = async (data) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json', 
        scopes: 'https://www.googleapis.com/auth/spreadsheets',
    });

    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: 'v4', auth: client });
    const spreadsheetId = '1NbSjkLZlSUlwoUI-iaPfPIUgixi4-aXuT7Ce_VAR3IA';

    await googleSheets.spreadsheets.values.append({
        auth,
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

app.post('/add-user', authenticateUser, async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).send('Por favor, forneça nome e email.');
    }

    try {
        await insertDataIntoSheet({ name, email });
        res.send('Usuário inserido com sucesso na planilha!');
    } catch (error) {
        console.error('Erro ao inserir os dados na planilha:', error);
        res.status(500).send('Erro ao inserir os dados na planilha.');
    }
});

app.get('/read-sheet', authenticateUser, async (req, res) => {
    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: 'credentials.json',
            scopes: 'https://www.googleapis.com/auth/spreadsheets',
        });

        const client = await auth.getClient();
        const googleSheets = google.sheets({ version: 'v4', auth: client });
        const spreadsheetId = '1NbSjkLZlSUlwoUI-iaPfPIUgixi4-aXuT7Ce_EIR0BU';

        const getRows = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: 'Folha1!A:B',
        });

        const rows = getRows.data.values;
        res.send(rows);  
    } catch (error) {
        console.error('Erro ao ler os dados da planilha:', error);
        res.status(500).send('Erro ao ler os dados da planilha.');
    }
});

app.get('/user-data', authenticateUser, async (req, res) => {
    const { username } = req.query;

    try {
        const usersDB = [
            { username: 'admin', email: 'admin@example.com', role: 'admin' },
            { username: 'user', email: 'user@example.com', role: 'user' }
        ];

        const userData = usersDB.find(u => u.username === username);

        if (!userData) {
            return res.status(404).send('Usuário não encontrado.');
        }

        res.json(userData);
    } catch (error) {
        console.error('Erro ao buscar os dados do usuário:', error);
        res.status(500).send('Erro ao buscar os dados do usuário.');
    }
});

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

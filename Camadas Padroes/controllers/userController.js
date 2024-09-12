const userService = require('../services/userService');

exports.addUser = async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).send('Por favor, forneça nome e email.');
    }

    try {
        await userService.addUserToSheet({ name, email });
        res.send('Usuário inserido com sucesso na planilha!');
    } catch (error) {
        console.error('Erro ao inserir os dados na planilha:', error);
        res.status(500).send('Erro ao inserir os dados na planilha.');
    }
};

exports.readSheet = async (req, res) => {
    try {
        const rows = await userService.getSheetData();
        res.send(rows);
    } catch (error) {
        console.error('Erro ao ler os dados da planilha:', error);
        res.status(500).send('Erro ao ler os dados da planilha.');
    }
};

exports.getUserData = async (req, res) => {
    const { username } = req.query;

    try {
        const userData = await userService.getUserData(username);
        if (!userData) {
            return res.status(404).send('Usuário não encontrado.');
        }

        res.json(userData);
    } catch (error) {
        console.error('Erro ao buscar os dados do usuário:', error);
        res.status(500).send('Erro ao buscar os dados do usuário.');
    }
};

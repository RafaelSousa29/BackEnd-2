import { Request, Response } from 'express';
import userService from '../services/userService';


export const addUser = async (req: Request, res: Response): Promise<void> => {
    const { name, email } = req.body;

    if (!name || !email) {
        res.status(400).send('Por favor, forneça nome e email.');
        return;
    }

    try {
        await userService.addUserToSheet({ name, email });
        res.send('Usuário inserido com sucesso na planilha!');
    } catch (error) {
        console.error('Erro ao inserir os dados na planilha:', error);
        res.status(500).send('Erro ao inserir os dados na planilha.');
    }
};

export const readSheet = async (req: Request, res: Response): Promise<void> => {
    try {
        const rows = await userService.getSheetData();
        res.send(rows);
    } catch (error) {
        console.error('Erro ao ler os dados da planilha:', error);
        res.status(500).send('Erro ao ler os dados na planilha.');
    }
};

export const getUserData = async (req: Request, res: Response): Promise<void> => {
    const { username } = req.query;

    if (typeof username !== 'string') {
        res.status(400).send('Parâmetro de consulta inválido.');
        return;
    }

    try {
        const userData = await userService.getUserData(username);
        if (!userData) {
            res.status(404).send('Usuário não encontrado.');
            return;
        }

        res.json(userData);
    } catch (error) {
        console.error('Erro ao buscar os dados do usuário:', error);
        res.status(500).send('Erro ao buscar os dados do usuário.');
    }
};

import { Request, Response, NextFunction } from 'express';

interface User {
    username: string;
    password: string;
}

const users: User[] = [
    { username: 'admin', password: '1234' },
    { username: 'user', password: 'abcd' }
];

export const authenticateUser = (req: Request, res: Response, next: NextFunction): void => {
    const { username, password } = req.query;

    if (typeof username === 'string' && typeof password === 'string') {
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            req.user = user;
            next();
        } else {
            res.status(401).send('Credenciais inválidas. Tente novamente.');
        }
    } else {
        res.status(400).send('Parâmetros de autenticação inválidos.');
    }
};

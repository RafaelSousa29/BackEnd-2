import { Request, Response, NextFunction } from 'express';

export const logUserObject = (req: Request, res: Response, next: NextFunction): void => {
    if (req.method === 'POST' || req.method === 'PUT') {
        console.log('Dados do usuário recebidos (req.body):', req.body);
    } else if (req.method === 'GET') {
        console.log('Dados do usuário recebidos (req.query):', req.query);
    }
    next();
};

export const globalLogger = (req: Request, res: Response, next: NextFunction): void => {
    console.log(`Requisição recebida: ${req.method} ${req.path}`);
    next();
};

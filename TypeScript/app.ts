import express from 'express';
import { addUser, readSheet, getUserData } from './controllers/userController';
import { authenticateUser } from './middlewares/authMiddleware';
import { logUserObject, globalLogger } from './middlewares/logMiddleware';

const app = express();

app.use(express.json());

app.use(logUserObject);
app.use(globalLogger);

// Rotas
app.post('/add-user', authenticateUser, addUser);
app.get('/read-sheet', authenticateUser, readSheet);
app.get('/user-data', authenticateUser, getUserData);

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

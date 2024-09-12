const express = require('express');
const app = express();

const userController = require('./controllers/userController');
const { authenticateUser } = require('./middlewares/authMiddleware');
const { logUserObject, globalLogger } = require('./middlewares/logMiddleware');

app.use(express.json());

// Global Middlewares
app.use(logUserObject);
app.use(globalLogger);

// Roots
app.post('/add-user', authenticateUser, userController.addUser);
app.get('/read-sheet', authenticateUser, userController.readSheet);
app.get('/user-data', authenticateUser, userController.getUserData);

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

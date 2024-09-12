// Middleware de Logging
exports.logUserObject = (req, res, next) => {
    if (req.method === 'POST' || req.method === 'PUT') {
        console.log('Dados do usuário recebidos (req.body):', req.body);
    } else if (req.method === 'GET') {
        console.log('Dados do usuário recebidos (req.query):', req.query);
    }
    next();
};

// Middleware de logging global
exports.globalLogger = (req, res, next) => {
    console.log(`Requisição recebida: ${req.method} ${req.path}`);
    next();
};

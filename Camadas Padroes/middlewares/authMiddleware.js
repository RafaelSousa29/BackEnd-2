exports.authenticateUser = (req, res, next) => {
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

// config da database

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nome_banco_de_dados', 'nome_de_usuario', 'senha', {
    host: 'postgres.ct2uoay48b4g.us-east-1.rds.amazonaws.com',
    dialect: 'postgres', 
});

module.exports = sequelize;

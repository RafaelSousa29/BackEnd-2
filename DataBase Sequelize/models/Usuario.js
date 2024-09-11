// config do usuario

const { DataTypes } = require('sequelize');
const sequelize = require('./database.js');

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
    telefone: DataTypes.STRING,
    endereco: DataTypes.STRING

});

module.exports = Usuario;

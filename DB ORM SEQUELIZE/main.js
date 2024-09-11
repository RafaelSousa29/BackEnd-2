const sequelize = require('./models/database.js');
const usuario = require('./models/Usuario.js');


try {
    await sequelize.authenticate(); // verifica a conexão com o banco de dados
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

    await Usuario.sync( { alter: true }); // cria a tabela usuário, se ela nao existir

    const novoUsuario = await Usuario.create({
        nome: 'Rafael',
        email: 'rafael.sousadev29@gmail.com',
        senha: 'teste123',
        telefone: '963874381',
        endereco: 'av abade tagilde'
    });

    console.log('Usuario inserido com sucesso', novoUsuario.toJSON());

} catch (error) {
    console.log('Erro ao conectar/inserir no banco de dados', error);
} finally {
    sequelize.close(); // fecha a conexão com o banco de dados.
}
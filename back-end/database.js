const { Sequelize } = require("sequelize");

// Cria a instância do Sequelize usando SQLite
const sequelize = new Sequelize("sqlite:./database.sqlite");

// Exporta a instância para uso em outros arquivos
module.exports = sequelize;

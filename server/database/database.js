const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:crzwh1d1@localhost:5432/postgres');

module.exports = sequelize;

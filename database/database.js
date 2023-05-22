const Sequelize = require('sequelize');
const conection = new Sequelize('yahooperguntas', 'root', '1415',{
    host: 'localhost',
    dialect: 'mysql',
    logging: false
})

module.exports = conection;
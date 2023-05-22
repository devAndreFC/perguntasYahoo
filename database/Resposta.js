const Sequelize = require("sequelize");
const conection = require("./database");

const Resposta = conection.define("Respostas", {
    corpo:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Resposta.sync({force: false})

module.exports = Resposta
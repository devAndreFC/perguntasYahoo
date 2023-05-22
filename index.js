const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const conection = require('./database/database');
const perguntaModel = require("./database/Pergunta");

conection.authenticate().then(()=>{
    console.log('Conectado ao banco de dados');
}).catch((msgerro)=>{
    console.log(msgerro);
})

app.set('view engine', 'ejs'); // usando o ejs para rederixar o html
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {res.render('index');});
app.get('/perguntar', (req, res) => {res.render('perguntar');});
app.post('/salvarpergunta', (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    res.send('Pergunta salva '+titulo + descricao);
});

app.listen(8080, () => {console.log('Server no ar!');});
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const conection = require('./database/database'); // conectando ao bd
const Pergunta = require("./database/Pergunta"); // importando o bd das perguntas
const Resposta = require("./database/Resposta"); // importando o bd das respostas

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

conection.authenticate().then(()=>{
    console.log('Conectado ao banco de dados');
}).catch((msgerro)=>{
    console.log(msgerro);
})

app.set('view engine', 'ejs'); // usando o ejs para rederixar o html
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ROTA PRINCIPAL
app.get('/', (req, res) => {
    Pergunta.findAll({raw: true, order:[
        ['id','DESC']
    ]}).then(perguntas => { // equivalente ao SELECT * FROM perguntas
        res.render('index', {
            perguntas: perguntas
        });
    })

});

// ROTA DE FAZER PERGUNTA
app.get('/perguntar', (req, res) => {res.render('perguntar');});

// ROTA DE SALVAR PERGUNTA
app.post('/salvarpergunta', (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create( // equivalente ao INSERTO INTO ...
        {
            titulo: titulo,
            descricao: descricao
        }
    ).then(() => {
        res.redirect("/")
    }) 
});

// ROTA DA PERGUNTA CADASTRADA
app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta =>{
        if (pergunta != undefined){
            Resposta.findAll({
                where: {perguntaId:pergunta.id},
                order:[["id", "DESC"]]
            }).then(respostas =>{
                res.render('pergunta', {
                    pergunta: pergunta,
                    respostas: respostas})
                })
        }else{
            res.redirect('/')
        }
    })
})

// ROTA DE RESPONDER
app.post('/responder', (req, res) => {
    var corpo = req.body.corpo
    var perguntaID = req.body.pergunta
    
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaID
    }).then(()=>{
        res.redirect("/pergunta/"+perguntaID)
    })
})
app.listen(8080, () => {console.log('Server no ar!');});
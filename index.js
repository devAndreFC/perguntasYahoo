const express = require('express');
const app = express();
app.set('view engine', 'ejs'); // usando o ejs para rederixar o html
app.use(express.static('public'));

app.get('/', (req, res) => {res.render('index');});
app.get('/perguntar', (req, res) => {res.render('perguntar');});

app.listen(8080, () => {
  console.log('Example app listening on port 3000!');});
const express = require('express');
const routes = require('./routes/index.js');
const db = require('./config/dbConnect.js');

db.on('error', console.log.bind(console, 'erro de conexão'));
db.once('open', () => { console.log('conexão com o db feita com sucesso') });

const app = express();
const port = 3000;
app.use(express.json());

routes(app);

app.listen(port, () => console.log('rodando'));


module.exports = app;

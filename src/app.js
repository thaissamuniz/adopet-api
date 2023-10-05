const cors = require('cors');
const express = require('express');
const routes = require('./routes/index.js');
const db = require('./config/dbConnect.js');
const notFoundHandler = require('./middlewares/notFoundHandler.js');
const errorHandler = require('./middlewares/errorsHandler.js');

db.on('error', console.log.bind(console, 'erro de conexão'));
db.once('open', () => { console.log('conexão com o db feita com sucesso') });


const app = express();
app.use(cors());
app.use(express.json());

routes(app);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;

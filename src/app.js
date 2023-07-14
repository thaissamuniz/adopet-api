const express = require('express');
const routes = require('./routes/index.js');


const app = express();
const port = 3000;
app.use(express.json());

routes(app);

app.listen(port, () => console.log('rodando'));


module.exports = app;

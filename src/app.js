const cors = require('cors');
const express = require('express');
const routes = require('./routes/index.js');
const dbConnect = require('./config/dbConnect.js');
const notFoundHandler = require('./middlewares/notFoundHandler.js');
const errorHandler = require('./middlewares/errorsHandler.js');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

async function createApp(uri) {
    const db = await dbConnect(uri)
    db.connection.on('error', console.log.bind(console, 'erro de conexão'));
    db.connection.once('open', () => { console.log('conexão com o db feita com sucesso'); });


    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    routes(app);

    app.use(notFoundHandler);
    app.use(errorHandler);
    return app;
}

module.exports = createApp;
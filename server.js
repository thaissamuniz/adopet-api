const createApp = require('./src/app.js');
const port = process.env.PORT || 3000;

createApp(process.env.DB).then(app => app.listen(port, () => console.log(`servidor rodando na porta ${port}`)));
function notFoundHandler(req, res, next) {
    res.status(404).send('pagina não encontrada.');
}

module.exports = notFoundHandler;
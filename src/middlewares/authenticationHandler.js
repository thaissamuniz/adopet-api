const { verify } = require("jsonwebtoken");

function authenticationHandler(req, res, next) {
    const token = req.headers.authorization;
    const [, acessToken] = token.split(" ");

    if (!token) {
        return res.status(401).send('acesso negado.');
    }

    try {
        const secret = process.env.SECRET;
        verify(acessToken, secret);
        next();
    } catch (err) {
        res.status(401).send('você não tem permissão para acessar essa página.')
    }
}

module.exports = authenticationHandler;
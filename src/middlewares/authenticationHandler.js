const { verify } = require("jsonwebtoken");

function authenticationHandler(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send('acesso negado.');
    }

    const [, acessToken] = token.split(" ");
    try {
        const secret = process.env.SECRET;
        const infos = verify(acessToken, secret);
        req.user = infos.id;
        next();
    } catch (err) {
        res.status(401).send('você não tem permissão para acessar essa página.')
    }
}

module.exports = authenticationHandler;
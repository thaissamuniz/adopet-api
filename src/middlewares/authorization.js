const { users } = require("../models");

async function authorization(req, res, next) {
    try {
        const user = await users.findById(req.user);

        if (user.role == "admin") {
            next();
            return;
        }
        res.status(403).send('você não tem permissão para isso.');
        return;
    } catch (error) {
        res.status(500).send('erro ao tentar acessar a rota de adoções.');
        return;
    }
}

module.exports = authorization;
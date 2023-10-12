const AuthService = require('../services/AuthService.js');
const authService = AuthService.getInstance();

class AuthController {
    static async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            const login = await authService.login(email, password);
            if (login) {
                return res.status(200).send(login);
            }
            return res.status(401).send('email ou senha inválidos.');
        } catch (err) {
            res.status(500).send(`${err.message} - email ou senha inválidos.`);
        }
    }
}

module.exports = AuthController;
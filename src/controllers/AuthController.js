const shelters = require('../models/Shelter.js');
const users = require('../models/User.js');
const AuthService = require('../services/AuthService.js');
const authService = AuthService.getInstance();
// const userAuth = authService.database = users;

class AuthController {
    static async loginUser(req, res) {
        const { email, password } = req.body;

        try {
            const login = await authService.login(users, email, password);
            res.status(200).send(login);
        } catch (err) {
            res.status(401).send('email ou senha inválidos.');
        }
    }

    static async loginShelter(req, res) {
        const { email, password } = req.body;

        try {
            const login = await authService.login(shelters, email, password);
            res.status(200).send(login);
        } catch (err) {
            res.status(401).send('email ou senha inválidos.');
        }
    }

}

module.exports = AuthController;
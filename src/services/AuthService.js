require('dotenv').config();
const bcrypt = require('bcrypt');
const { users } = require('../models');
const { sign } = require('jsonwebtoken');


class AuthService {
    static _instance;

    static getInstance() {
        if (!AuthService._instance) {
            AuthService._instance = new AuthService();
        }

        return AuthService._instance;
    }

    async login(email, password) {
        const user = await users.findOne({ email: email });

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!user || !checkPassword) {
            return res.status(422).send('email ou senha inválidos');
        }

        try {
            const secret = process.env.SECRET;
            const token = sign({
                id: user._id
            },
                secret,
                {
                    expiresIn: 86400
                })

            return { token };

        } catch (err) {
            console.log(err);
            res.status(500).send('erro interno no servidor');
        }
    }
}

module.exports = AuthService;
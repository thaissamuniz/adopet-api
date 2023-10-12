require('dotenv').config();
const bcrypt = require('bcrypt');
const { users } = require('../models');
const { sign } = require('jsonwebtoken');


class AuthService {
    static _instance;
    static database;

    static getInstance() {
        if (!AuthService._instance) {
            AuthService._instance = new AuthService();
        }

        return AuthService._instance;
    }

    async login(email, password) {
        try {
            const user = await users.findOne({ email: email });
            if (!user) {
                return false;
            }
            const checkPassword = await bcrypt.compare(password, user.password);

            if (!checkPassword) {
                return false;
            }

            const secret = process.env.SECRET;
            const token = sign({
                id: user._id,
                role: user.role
            },
                secret,
                {
                    expiresIn: 86400
                })

            return {
                token,
                "id": user._id,
                "name": user.name,
                "tel": user.tel,
                "city": user.city,
                "about": user.about
            };

        } catch (err) {
            return err.message;
        }
    }
}

module.exports = AuthService;
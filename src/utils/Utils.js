const { genSalt, hash } = require("bcrypt");
const { users } = require("../models");
const UsersService = require('../services/UsersServices.js');
const usersService = UsersService.getInstance(users);

class Utils {
    static async checkEmail(email) {
        const registeredEmail = await usersService.getUserByEmail(email);
        if (registeredEmail) {
            return true
        }
    }

    static async hashPassword(password) {
        const salt = await genSalt(12);
        return await hash(password, salt);
    }

    static userHasPermission(user) {
        if (user && user.role == 'admin') {
            return true;
        }
        return false;
    }
}

module.exports = Utils;
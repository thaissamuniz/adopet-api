const { genSalt, hash } = require("bcrypt");
const { users } = require("../models");

class Utils {
    static async checkEmail(email) {
        const registeredEmail = await users.findOne({ email: email });
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
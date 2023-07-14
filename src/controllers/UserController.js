const fs = require('fs');


class UserController {
    static async getUsers(req, res) {
        try {
            const users = JSON.parse(fs.readFileSync("db.json"));
            if (users.length < 1) {
                res.send('nenhum usuario cadastrado')
            } else {
                res.send(users)
            }
        } catch (error) {
            res.status(500).send(`${error.message} - deu erro`);
        }
    }
}

module.exports = UserController;
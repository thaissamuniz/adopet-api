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

    static async createUser(req, res) {
        try {
            const newUser = req.body;
            if (newUser.nome && newUser.email && newUser.senha) {
                const users = JSON.parse(fs.readFileSync("db.json"));
                const usersUpdated = [...users, newUser]
                fs.writeFileSync("db.json", JSON.stringify(usersUpdated));
                res.status(201).json(newUser)
            } else {
                res.status(422).send('os campos nome, email e senha são obrigatórios.');
            }
        } catch (error) {
            res.status(500).send(`${error.message} - erro no post`);
        }
    }
}

module.exports = UserController;
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
            res.status(500).send(`${error.message} - erro ao recuperar os dados`);
        }
    }

    static async createUser(req, res) {
        const newUser = req.body;
        try {
            if (newUser.nome && newUser.email && newUser.senha && newUser.id) {
                const users = JSON.parse(fs.readFileSync("db.json"));
                const usersUpdated = [...users, newUser]
                fs.writeFileSync("db.json", JSON.stringify(usersUpdated));
                res.status(201).json(newUser)
            } else {
                res.status(422).send('os campos nome,id , email e senha são obrigatórios.');
            }
        } catch (error) {
            res.status(500).send(`${error.message} - erro no post`);
        }
    }

    static async updateUser(req, res) {
        const { id } = req.params;
        const updatedData = req.body;

        try {
            let users = JSON.parse(fs.readFileSync("db.json"));
            const targetIdIndex = users.findIndex(user => user.id === Number(id));
            const updated = { ...users[targetIdIndex], ...updatedData };
            users[targetIdIndex] = updated;
            fs.writeFileSync("db.json", JSON.stringify(users));
            res.status(200).json(updated)
        } catch (error) {
            res.status(500).send(`${error.message} - erro ao atualizar usuario`);
        }
    }
}

module.exports = UserController;
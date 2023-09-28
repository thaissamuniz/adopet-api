const { users } = require('../models');
const UsersService = require('../services/UsersServices');
const { checkEmail, hashPassword } = require('../services/Utils');
const usersService = UsersService.getInstance(users);

class UserController {
    static async getUsers(req, res) {
        try {
            const result = await usersService.getAllUsers();

            if (result.length == 0) {
                res.send('nenhum usuario cadastrado.');
            } else if (result !== null) {
                res.status(200).json(result)
            }
        } catch (error) {
            res.status(500).send(`${error.message} - erro ao recuperar os dados`);
        }
    }

    static async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await usersService.getUserById(id);
            if (user !== null) {
                res.status(200).send(user);
            } else {
                res.status(422).send('usuario não encontrado.')
            }
        } catch (error) {
            res.status(500).send(`${error.message} - erro ao procurar usuario por id`);
        }
    }

    static async createUser(req, res) {
        try {
            const { email, password } = req.body;
            const emailAlreadyExists = await checkEmail(email, users)

            if (emailAlreadyExists) {
                res.status(401).send('email já cadastrado');
            } else {
                req.body.password = await hashPassword(password);
                const userResult = await usersService.createUser(req.body);
                res.status(201).send(userResult.toJSON());
            }
        } catch (error) {
            res.status(500).send(`${error.message} - erro no post`);
        }
    }

    static async updateUser(req, res) {

        try {
            const { id } = req.params;
            let user = await usersService.updateUser(id, req.body);
            if (user !== null) {
                res.status(200).send('usuario atualizado com sucesso.');
            } else {
                res.status(422).send('usuario não localizado.')
            }

        } catch (error) {
            res.status(500).send(`${error.message} - erro ao atualizar usuario`);
        }
    }

    static async deleteUser(req, res) {

        try {
            const { id } = req.params;
            const user = await usersService.deleteUser(id);
            if (user !== null) {
                res.status(200).send({ message: 'usuario apagadp com sucesso.' });
            } else {
                res.send('usuario não localizado.')
            }
        } catch (error) {
            res.status(500).send(`${error.message} - erro ao deletar usuario`);
        }
    }
}

module.exports = UserController;
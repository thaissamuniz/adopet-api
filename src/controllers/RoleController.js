const { roles } = require('../models');
const RolesService = require('../services/RolesServices');
const rolesService = RolesService.getInstance(roles);

class RoleController {
    static async getRoles(req, res) {
        try {
            const result = await rolesService.getAllRoles();

            if (result.length == 0) {
                res.send('nenhuma role cadastrada.');
            } else if (result !== null) {
                res.status(200).json(result)
            }
        } catch (error) {
            res.status(500).send(`${error.message} - erro ao recuperar os dados`);
        }
    }

    static async getRoleById(req, res) {
        try {
            const { id } = req.params;
            const role = await rolesService.getRoleById(id);
            if (role !== null) {
                res.status(200).send(role);
            } else {
                res.status(422).send('role não encontrada.')
            }
        } catch (error) {
            res.status(500).send(`${error.message} - erro ao procurar role por id`);
        }
    }

    static async createRole(req, res) {
        try {
            const { name } = req.body;

            if (await roles.findOne({ name: name })) {
                res.status(401).send('role já cadastrada');
            } else {
                const roleResult = await rolesService.createRole(req.body);
                res.status(201).send(roleResult.toJSON());
            }


            // const roleResult = await rolesService.createRole(req.body);
            // res.status(201).send(roleResult.toJSON())
        } catch (error) {
            res.status(500).send(`${error.message} - erro ao criar role`);
        }
    }

    static async updateRole(req, res) {

        try {
            const { id } = req.params;
            let role = await rolesService.updateRole(id, req.body);
            if (role !== null) {
                res.status(200).send('role atualizada com sucesso.');
            } else {
                res.status(422).send('role não localizada.')
            }

        } catch (error) {
            res.status(500).send(`${error.message} - erro ao atualizar role`);
        }
    }

    static async deleteRole(req, res) {

        try {
            const { id } = req.params;
            const role = await rolesService.deleteRole(id);
            if (role !== null) {
                res.status(200).send({ message: 'role apagada com sucesso.' });
            } else {
                res.send('role não localizada.')
            }
        } catch (error) {
            res.status(500).send(`${error.message} - erro ao deletar role`);
        }
    }
}

module.exports = RoleController;
const { roles } = require('../models');
const RolesService = require('../services/RolesServices');
const RoleController = require('./RoleController');
const rolesService = RolesService.getInstance(roles);

const mockedRolesService = jest.mocked(rolesService);

describe('RoleController:getRoles', () => {
    test('deve retornar 422 caso ainda não haja role cadastrada.', async () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn()
        };
        const req = {};
        mockedRolesService.getAllRoles = jest.fn().mockReturnValue([]);

        await RoleController.getRoles(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.send).toHaveBeenCalledWith('nenhuma role cadastrada.');
    });

    test('deve retornar 200 e as roles cadastradas.', async () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn()
        };
        const req = {};
        mockedRolesService.getAllRoles = jest.fn().mockReturnValue([{}, {}]);

        await RoleController.getRoles(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([{}, {}]);
    });

    test('deve reornar 500 caso algo de errado no bloco try.', async () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn()
        };
        const req = {};
        mockedRolesService.getAllRoles = jest.fn().mockRejectedValue(new Error());

        await RoleController.getRoles(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
    });
});


describe('RoleController:getRoleById', () => {
    test('deve retornar 200 e a role pelo id.', async () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn()
        };
        const req = {
            params: {
                id: 1
            }
        };

        const role = {};

        const next = jest.fn();
        mockedRolesService.getRoleById = jest.fn().mockReturnValue(role);

        await RoleController.getRoleById(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(role);
    });

    test('deve retornar 422 caso não encontre a role pelo id passado.', async () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn()
        };
        const req = {
            params: {
                id: 1
            }
        };
        const next = jest.fn();

        mockedRolesService.getRoleById = jest.fn().mockResolvedValue(null);

        await RoleController.getRoleById(req, res, next);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.send).toHaveBeenCalledWith('role não encontrada.');
    });

    test('deve chamar o próximo middleware caso algo de errado no bloco try.', async () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn()
        };
        const req = {};
        const next = jest.fn();

        mockedRolesService.getRoleById = jest.fn().mockRejectedValue(new Error());

        await RoleController.getRoleById(req, res, next);

        expect(next).toHaveBeenCalled();
    });
});

describe('RoleController:createRole', () => {
    test('deve retornar 401 e uma mensagem informando que a role já está cadastrada.', async () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn()
        };
        const req = {
            body: {
                name: ""
            }
        };
        const role = {};
        const mockedRoles = jest.mocked(roles);
        mockedRoles.findOne = jest.fn().mockResolvedValue(role);
        mockedRolesService.createRole = jest.fn().mockReturnValue("");

        await RoleController.createRole(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith('role já cadastrada');
        expect(mockedRolesService.createRole).not.toHaveBeenCalled();

    });

    test('deve retornar 201 e a role cadastrada.', async () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn()
        };
        const req = {
            body: {
                name: ""
            }
        };
        const role = {};
        const mockedRoles = jest.mocked(roles);
        mockedRoles.findOne = jest.fn().mockResolvedValue(null);
        mockedRolesService.createRole = jest.fn().mockReturnValue(req.body);

        await RoleController.createRole(req, res);

        expect(mockedRolesService.createRole).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
    });

    test('deve retornar status 500 caso algo de errado no bloco try.', async () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        const req = {};
        mockedRolesService.createRole = jest.fn().mockRejectedValue(new Error());

        await RoleController.createRole(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
    });
});

describe('RoleController:updateRole', () => {
    test('deve retornar 200 e uma mensagem informando que a role foi atualizada com sucesso', async () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        const req = {
            body: {
                name: ""
            },
            params: {
                id: 1
            }
        };
        const role = {};
        mockedRolesService.updateRole = jest.fn().mockReturnValue(role);

        await RoleController.updateRole(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith('role atualizada com sucesso.');
    });
    test('deve retornar 422 e uma mensagem informando que a role não foi localizada', async () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        const req = {
            body: {
                name: ""
            },
            params: {
                id: 1
            }
        };
        mockedRolesService.updateRole = jest.fn().mockReturnValue(null);

        await RoleController.updateRole(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.send).toHaveBeenCalledWith('role não localizada.');
    });

    test('deve retornar status 500 caso algo de errado no bloco try.', async () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        const req = {};
        mockedRolesService.updateRole = jest.fn().mockRejectedValue(new Error());

        await RoleController.updateRole(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
    });
});

describe('RoleController:deleteRole', () => {
    test('deve retornar 200 e uma mensagem informando que a role foi apagada com sucesso', async () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        const req = {
            params: {
                id: 1
            }
        };
        const role = {};
        mockedRolesService.deleteRole = jest.fn().mockReturnValue(role);

        await RoleController.deleteRole(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith('role apagada com sucesso.');
    });

    test('deve retornar 422 e uma mensagem informando que a role não foi localizada', async () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        const req = {
            params: {
                id: 1
            }
        };
        mockedRolesService.deleteRole = jest.fn().mockReturnValue(null);

        await RoleController.deleteRole(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.send).toHaveBeenCalledWith('role não localizada.');
    });

    test('deve retornar status 500 caso algo de errado no bloco try.', async () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        const req = {};
        mockedRolesService.deleteRole = jest.fn().mockRejectedValue(new Error());

        await RoleController.deleteRole(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
    });
});
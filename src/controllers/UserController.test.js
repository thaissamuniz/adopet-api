const { users } = require('../models');
const UsersService = require('../services/UsersServices');
const util = require('../utils/Utils');
const UserController = require('./UserController');
const usersService = UsersService.getInstance(users);

jest.mock('../utils/Utils');
const mockedUsersService = jest.mocked(usersService);
const mockedUtil = jest.mocked(util);

describe('', () => {
    test('deve retornar status 401 e uma mensagem informando que o email desejado já está cadastrado.', async () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn()
        };
        const req = {
            body: {
                email: "",
                password: ""
            }
        };
        mockedUtil.checkEmail = jest.fn().mockResolvedValue(true);
        mockedUsersService.createUser = jest.fn().mockReturnValue([]);

        await UserController.createUser(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith('email já cadastrado');
        expect(mockedUsersService.createUser).not.toHaveBeenCalled();
    });

    test('deve retornar status 201', async () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn()
        };
        const req = {
            body: {
                email: "",
                password: ""
            }
        };
        mockedUtil.checkEmail = jest.fn().mockResolvedValue(false);
        mockedUsersService.createUser = jest.fn().mockReturnValue(req.body);

        await UserController.createUser(req, res);

        expect(mockedUsersService.createUser).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalled();
    });

    test('deve retornar 500 caso algo de errado no bloco try.', async () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        const req = {};
        mockedUsersService.createUser = jest.fn().mockRejectedValue(new Error());

        await UserController.createUser(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
    });
});

describe('UserController:getUsers', () => {
    test('deve retornar 422 caso ainda não haja usuários cadastrados.', async () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn()
        };
        const req = {};
        mockedUsersService.getAllUsers = jest.fn().mockReturnValue([]);

        await UserController.getUsers(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.send).toHaveBeenCalledWith('nenhum usuario cadastrado.');
    });
    test('deve retornar status 200 e os usuários cadastrados.', async () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn()
        };
        const req = {};
        mockedUsersService.getAllUsers = jest.fn().mockReturnValue([{}, {}]);

        await UserController.getUsers(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([{}, {}]);
    });

    test('deve retornar 500 caso algo de errado no bloco try.', async () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        const req = {};
        mockedUsersService.getAllUsers = jest.fn().mockRejectedValue(new Error());

        await UserController.getUsers(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
    });
});

describe('UserController:getUserById', () => {
    test('deve retornar status 200 e o usuário por id.', async () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        const req = {
            params: {
                id: 1
            }
        };
        const user = {};
        mockedUsersService.getUserById = jest.fn().mockReturnValue(user);

        await UserController.getUserById(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(user);
    });
    test('deve retornar status 422 e uma mensagem informando que o usuario não foi encontrado.', async () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        const req = {
            params: {
                id: 1
            }
        };
        mockedUsersService.getUserById = jest.fn().mockReturnValue(null);

        await UserController.getUserById(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.send).toHaveBeenCalledWith('usuario não encontrado.');
    });

    test('deve reornar 500 caso algo de errado no bloco try.', async () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        const req = {};
        mockedUsersService.getUserById = jest.fn().mockRejectedValue(new Error());

        await UserController.getUserById(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
    });
});

describe('UserController:getUserByType', () => {
    test('deve retornar status 200 e o usuario', async () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        const req = {
            params: {
                accountType: ""
            }
        };

        const user = {};
        mockedUsersService.getUserByAccountType = jest.fn().mockReturnValue(user);

        await UserController.getUserByType(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(user);
    });
    test('deve retornar 422 e uma mensagem informando que não há usuarios com o tipo de conta desejado.', async () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        const req = {
            params: {
                accountType: ""
            }
        };
        mockedUsersService.getUserByAccountType = jest.fn().mockReturnValue(null);

        await UserController.getUserByType(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.send).toHaveBeenCalledWith(`nenhum usuario do tipo ${req.params.accountType} encontrado.`);
    });

    test('deve reornar 500 caso algo de errado no bloco try.', async () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        const req = {};
        mockedUsersService.getUserByAccountType = jest.fn().mockRejectedValue(new Error());

        await UserController.getUserByType(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
    });
});

describe('UserController:updateUser', () => {
    test('deve retornar status 200 e uma mensagem informando que usuario foi atualizado com sucesso.', async () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        const req = {
            body: {
                email: "",
                password: ""
            },
            params: {
                id: 1
            }
        };
        mockedUsersService.updateUser = jest.fn().mockReturnValue(req.body);

        await UserController.updateUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith('usuario atualizado com sucesso.');
    });
    test('deve retornar status 422 e uma mensagem informando que usuario não foi localizado.', async () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        const req = {
            body: {
                email: "",
                password: ""
            },
            params: {
                id: 1
            }
        };
        mockedUsersService.updateUser = jest.fn().mockReturnValue(null);

        await UserController.updateUser(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.send).toHaveBeenCalledWith('usuario não localizado.');
    });

    test('deve reornar 500 caso algo de errado no bloco try.', async () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        const req = {};
        mockedUsersService.updateUser = jest.fn().mockRejectedValue(new Error());

        await UserController.updateUser(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
    });
});

describe('UserController:deleteUser', () => {
    test('deve retornar status 200 e uma mensagem informando que usuario foi apagado com sucesso.', async () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        const req = {
            body: {
                email: "",
                password: ""
            },
            params: {
                id: 1
            }
        };
        const user = {};
        mockedUsersService.deleteUser = jest.fn().mockReturnValue(user);

        await UserController.deleteUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith('usuario apagado com sucesso.');
    });
    test('deve retornar status 422 e uma mensagem informando que usuario não foi localizado.', async () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        const req = {
            params: {
                id: 1
            }
        };
        mockedUsersService.deleteUser = jest.fn().mockReturnValue(null);

        await UserController.deleteUser(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.send).toHaveBeenCalledWith('usuario não localizado.');
    });

    test('deve reornar 500 caso algo de errado no bloco try.', async () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        const req = {};
        mockedUsersService.deleteUser = jest.fn().mockRejectedValue(new Error());

        await UserController.deleteUser(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
    });
});
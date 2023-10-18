const { users } = require("../models");
jest.mock('../models');

const authorization = require("./authorization");

describe("authorization", () => {
    const mockedUser = jest.mocked(users);

    test('deve retornar undefined se o usuario tiver role admin', async () => {
        const res = {
            status: jest.fn(() => res),
            send: jest.fn()
        };
        const mockNext = jest.fn();
        const req = { user: 1 }
        const mockValue = { role: "admin" }
        mockedUser.findById.mockResolvedValue(mockValue);

        await expect(authorization(req, null, mockNext)).resolves.toBe(undefined);
        expect(mockNext).toHaveBeenCalled();
    });

    test('deve retornar status 403 se o usuario não tiver a role admin', async () => {
        const res = {
            status: jest.fn(() => res),
            send: jest.fn()
        };
        const mockNext = jest.fn();
        const req = {
            user: {
                id: 1,
                role: "user"
            }
        }
        const mockValue = { role: "user" }
        mockedUser.findById.mockResolvedValue(mockValue);

        await authorization(req, res, mockNext)

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.send).toHaveBeenCalledWith('você não tem permissão para isso.');
        expect(mockNext).not.toHaveBeenCalled();
    });


    test('deve retornar status code 500 quando algo da errado no bloco try', async () => {
        const res = {
            status: jest.fn(() => res),
            send: jest.fn()
        };
        const mockNext = jest.fn();
        const req = { user: "" }
        mockedUser.findById.mockRejectedValue(new Error(""));

        await authorization(req, res, mockNext);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('erro ao tentar acessar a rota de adoções.');
    });
});
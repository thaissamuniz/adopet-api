const AuthService = require('../services/AuthService.js');
const AuthController = require('./AuthController.js');
const authService = AuthService.getInstance();

const mockedAuthService = jest.mocked(authService);

describe('AuthController:loginUser', () => {
    const mockResponse = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn()
    };
    const req = {
        body: {
            email: "",
            password: ""
        }
    }

    test('Deve retornar 200 e o token para login', async () => {
        const token = "Gtsf65LKsyt";
        mockedAuthService.login = jest.fn().mockResolvedValue(token);
        await AuthController.loginUser(req, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.send).toHaveBeenCalledWith(token);
    });

    test('Deve retornar 401 e informar que email ou senha são inválidos', async () => {
        mockedAuthService.login = jest.fn().mockResolvedValue(null);
        await AuthController.loginUser(req, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.send).toHaveBeenCalledWith('email ou senha inválidos.');
    });

    test('Deve retornar status 500 caso algo dê erro no bloco try', async () => {
        mockedAuthService.login = jest.fn().mockRejectedValue(new Error());
        await AuthController.loginUser(null, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
    });
})
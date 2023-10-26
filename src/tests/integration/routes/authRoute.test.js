const request = require('supertest');
const createApp = require('../../../app');
const dbHandler = require('../../dbHandler');
let app;

beforeAll(async () => {
    const uri = await dbHandler.dbConnect();
    app = await createApp(uri)
});
afterAll(async () => {
    await dbHandler.dbDisconnect();
});

describe('POST /login/user', () => {
    it('deve retornar 401 e uma mensagem inforando que email ou senha são inválidos.', async () => {
        const res = await request(app)
            .post('/login/user')
            .send({
                email: "teste@teste.com",
                password: "123456"
            })
            .expect(401);

        expect(res.text).toBe('email ou senha inválidos.');
    });
});

describe('POST /login/user', () => {
    it('deve retornar 200 e o token do usuario.', async () => {
        await request(app)
            .post('/users')
            .send({
                name: "Teste teste",
                email: "teste@teste.com",
                password: "123456",
                accountType: "tutor",
                role: "user"
            });

        const res = await request(app)
            .post('/login/user')
            .send({
                email: "teste@teste.com",
                password: "123456"
            })
            .expect(200);

        expect(res.body).toHaveProperty("token");
    });
});
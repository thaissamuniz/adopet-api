const request = require('supertest');
const createApp = require('../../../app');
const dbHandler = require('../../dbHandler');
let app;
let id;

beforeAll(async () => {
    const uri = await dbHandler.dbConnect();
    app = await createApp(uri)
});

afterAll(async () => {
    await dbHandler.dbDisconnect();
});

describe('POST /users', () => {
    it('deve retornar 201 e o usuario criado.', async () => {
        const res = await request(app)
            .post('/users')
            .send({
                name: "Teste teste",
                email: "teste@teste.com",
                password: "123456",
                accountType: "tutor",
                role: "user"
            })
            .expect(201);

        expect(res.body.name).toBe('Teste teste');
    });
});


describe('GET /users', () => {
    it('deve retornar 200 e uma lista com todos os usuarios cadastrados.', async () => {
        const res = await request(app)
            .get('/users')
            .expect('content-type', /json/)
            .expect(200);

        expect(res.body).toBeInstanceOf(Array);
        id = res.body[0]._id;
    });
});

describe('GET /users/:id', () => {
    it('deve retornar 200 e o usuario do id passado.', async () => {
        const res = await request(app)
            .get(`/users/${id}`)
            .expect(200);

        expect(res.body.name).toBe('Teste teste');
    });
});

describe('GET /users/:accountType', () => {
    it('deve retornar 200 e todos os usuarios cadastrados que tem o tipo de conta passado.', async () => {
        const res = await request(app)
            .get(`/users/accountType/tutor`)
            .expect(200)

        expect(res.body[0].accountType).toBe('tutor');
    });
});

describe('PUT /users/:id', () => {
    it('deve retornar 200 e uma mensagem informando que o usuario foi atualizado com sucesso.', async () => {
        const res = await request(app)
            .put(`/users/${id}`)
            .send({ name: "Teste teste teste" })
            .expect(200)

        expect(res.text).toBe('usuario atualizado com sucesso.');
    });
});

describe('DELETE /users/:id', () => {
    it('deve retornar 200 e uma mensagem informando que o usuario foi apagado com sucesso.', async () => {
        const res = await request(app)
            .delete(`/users/${id}`)
            .expect(200)

        expect(res.text).toBe('usuario apagado com sucesso.');
    });
});
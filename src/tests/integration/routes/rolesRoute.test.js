const request = require('supertest');
// const app = require('../../../app.js');
const createApp = require('../../../app');
const dbHandler = require('../../dbHandler');
let server;
let user;
let id;
let token;

let app;

beforeAll(async () => {
    const uri = await dbHandler.dbConnect();
    app = await createApp(uri)
    // server = app.listen(3000);

    user = await request(app)
        .post('/users')
        .send({
            name: "Teste teste",
            email: "teste@teste.com",
            password: "123456",
            accountType: "abrigo",
            role: "admin"
        });

    token = await request(app)
        .post('/login/user')
        .send({
            email: "teste@teste.com",
            password: "123456"
        })
});

afterAll(async () => {
    await dbHandler.dbDisconnect();
});

describe('POST /roles', () => {
    it('deve retornar 401 e uma mensagem informando que o acesso a rota foi negado.', async () => {
        const res = await request(app)
            .post('/roles')
            .send({
                name: "editor"
            })
            .expect(401);

        expect(res.text).toBe('acesso negado.');
    });
});

describe('POST /roles', () => {
    it('deve retornar 201 e a role criada.', async () => {
        const res = await request(app)
            .post('/roles')
            .set('Authorization', `Bearer ${token.body.token}`)
            .send({
                name: "user"
            })
            .expect(201);

        expect(res.body.name).toBe("user");
    });

    it('deve retornar 401 e uma mensagem informando que essa role já existe.', async () => {
        const res = await request(app)
            .post('/roles')
            .set('Authorization', `Bearer ${token.body.token}`)
            .send({
                name: "user"
            })
            .expect(401);

        expect(res.text).toBe("role já cadastrada");
    });
});

describe('GET /roles', () => {
    it('deve retornar 200 e uma lista com todos as roles cadastradas.', async () => {
        const res = await request(app)
            .get('/roles')
            .set('Authorization', `Bearer ${token.body.token}`)
            .expect('content-type', /json/)
            .expect(200);

        expect(res.body).toBeInstanceOf(Array);
        id = res.body[0]._id;
    });
});

describe('GET /roles/:id', () => {
    it('deve retornar 200 e a role do id passado.', async () => {
        const res = await request(app)
            .get(`/roles/${id}`)
            .set('Authorization', `Bearer ${token.body.token}`)
            .expect(200);

        expect(res.body.name).toBe('user');
    });
});

describe('PUT /roles/:id', () => {
    it('deve retornar 200 e uma mensagem informando que a role foi atualizada com sucesso.', async () => {
        const res = await request(app)
            .put(`/roles/${id}`)
            .set('Authorization', `Bearer ${token.body.token}`)
            .send({ name: "teste" })
            .expect(200)

        expect(res.text).toBe('role atualizada com sucesso.');
    });
});

describe('DELETE /roles/:id', () => {
    it('', async () => {
        const res = await request(app)
            .delete(`/roles/65396fdc333e5b396b7d39fd`)
            .set('Authorization', `Bearer ${token.body.token}`)
            .expect(422)

        expect(res.text).toBe('role não localizada.');
    });

    it('deve retornar 200 e uma mensagem informando que a role foi apagada com sucesso.', async () => {
        const res = await request(app)
            .delete(`/roles/${id}`)
            .set('Authorization', `Bearer ${token.body.token}`)
            .expect(200)

        expect(res.text).toBe('role apagada com sucesso.');
    });
});
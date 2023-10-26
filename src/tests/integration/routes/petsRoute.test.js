const request = require('supertest');
const createApp = require('../../../app');
const dbHandler = require('../../dbHandler');
let server;
let user;
let token;
let id;

beforeAll(async () => {
    const uri = await dbHandler.dbConnect();
    app = await createApp(uri)
    server = app.listen(3000);

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
        });
});

afterAll(async () => {
    await dbHandler.dbDisconnect();
});

describe("POST /pets", () => {
    it('deve retornar 201 e o pet criado.', async () => {
        const res = await request(app)
            .post('/pets')
            .set("Authorization", `Bearer ${token.body.token}`)
            .send({
                name: "teste",
                age: "2 meses",
                size: "pequeno",
                details: "fhiufi dhgyd dgyudfyu",
                city: "Niterói",
                state: "RJ",
                adopted: false,
                shelter: user.body._id
            })
            .expect(201);

        expect(res.body.name).toBe('teste');
        id = res.body._id;
    });
});

describe("GET /pets", () => {
    it('deve retornar 200 e todos os pets registrados.', async () => {
        const res = await request(app)
            .get('/pets')
            .set("Authorization", `Bearer ${token.body.token}`)
            .expect('content-type', /json/)
            .expect(200);

        expect(res.body).toBeInstanceOf(Array);
    });
});

describe("GET /pets-available", () => {
    it('deve retornar 200 e os pets registrados que tenha a propriedade adopted: false.', async () => {
        const res = await request(app)
            .get('/pets-available')
            .set("Authorization", `Bearer ${token.body.token}`)
            .expect('content-type', /json/)
            .expect(200);

        expect(res.body).toBeInstanceOf(Array);
        expect(res.body[0].adopted).toBe(false);
    });
});

describe("PUT /pets/:id", () => {
    it('deve retornar 200 e uma mensagem informando que o pet foi atualizado com sucesso.', async () => {
        const res = await request(app)
            .put(`/pets/${id}`)
            .set("Authorization", `Bearer ${token.body.token}`)
            .send({ age: "3 meses" })
            .expect(200);

        expect(res.text).toBe('animal atualizado com sucesso.');
    });
});

describe("PUT /pets/:id", () => {
    it('deve retornar 200 e uma mensagem informando que o pet foi deletado com sucesso.', async () => {
        const res = await request(app)
            .delete(`/pets/${id}`)
            .set("Authorization", `Bearer ${token.body.token}`)
            .expect(200);

        expect(res.text).toBe('animal apagado com sucesso.');
    });
});
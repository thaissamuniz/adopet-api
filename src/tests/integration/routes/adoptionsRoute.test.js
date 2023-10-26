const request = require('supertest');
const createApp = require('../../../app');
const dbHandler = require('../../dbHandler');
let id;
let user;
let token;
let pet;
let app;

beforeAll(async () => {
    const uri = await dbHandler.dbConnect();
    app = await createApp(uri)
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

    pet = await request(app)
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
        });


});

afterAll(() => {
    dbHandler.dbDisconnect();
});

describe('POST /adoptions', () => {


    it('deve retornar 201 e criar uma nova adoção.', async () => {
        const res = await request(app)
            .post('/adoptions')
            .set("Authorization", `Bearer ${token.body.token}`)
            .send({
                pet: pet.body._id,
                user: user.body._id
            })
            .expect(201);

        id = res.body._id;
    });
});

describe('POST /adoptions', () => {
    it('deve retornar 403 e uma mensagem informando que o animal já foi adotado', async () => {
        const res = await request(app)
            .post('/adoptions')
            .set("Authorization", `Bearer ${token.body.token}`)
            .send({
                pet: pet.body._id,
                user: user.body._id
            })
            .expect(403);

        expect(res.text).toBe('esse animal já foi adotado.')
    });
});

describe('GET /adoptions', () => {
    it('deve retornar 200 e as adoções cadastradas.', async () => {
        const res = await request(app)
            .get('/adoptions')
            .set("Authorization", `Bearer ${token.body.token}`)
            .expect('content-type', /json/)
            .expect(200)

        expect(res.body).toBeInstanceOf(Array);
    });
});

describe('DELETE /adoptions/:id', () => {
    it('deve retornar 200 e uma mensagem informando que a adoção foi deletada com sucesso.', async () => {
        const res = await request(app)
            .delete(`/adoptions/${id}`)
            .set("Authorization", `Bearer ${token.body.token}`)
            .expect(200)

        expect(res.text).toBe('adoção apagada com sucesso.');
    });
});
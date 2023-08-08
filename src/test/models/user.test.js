const User = require('../../models/User.js');

describe('testando modelo de usuario', () => {
    const usuario = {
        name: "Lucia Camargo",
        email: "luci@gmail.com",
        tel: "21 990655218",
        city: "Nova Iguaçu",
        state: "RJ",
        password: "1234567"
    }
    it('instancia um usuario', () => {
        const user = new User(usuario);

        expect(user).toEqual(
            expect.objectContaining(usuario)
        );
    });
})
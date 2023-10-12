const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'o nome é obrigatório'],
            minlength: [3, 'o nome tem que ter no minimo 5 caracters']
        },
        email: {
            type: String,
            required: [true, 'email é obrigatório'],
            validate: {
                validator: function (email) {
                    const format = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
                    return format.test(email)
                },
                message: 'formato de email inválido.'
            }
        },
        password: {
            type: String,
            required: [true, 'defina uma senha'],
            minlength: [6, 'a senha deve conter pelo menos 6 caracteres']
        },
        tel: {
            type: String,
            validate: {
                validator: function (tel) {
                    return /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/.test(tel)
                }
            }
        },
        city: {
            type: String,
            minlength: 5
        },
        state: {
            type: String,
            maxlength: [2, 'digite apenas a sigla do estado']
        },
        accountType: {
            type: String,
            enum: ['tutor', 'abrigo'],
            required: [true, 'o tipo da conta é obrigatorio']
        },
        role: {
            type: String,
            enum: ['user', 'admin', 'manager'],
            ref: 'roles',
            required: [true, 'defina uma role']
        },
        about: String
    }
)

const users = mongoose.model("users", userSchema);

module.exports = users;
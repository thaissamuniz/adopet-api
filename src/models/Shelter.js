const mongoose = require('mongoose');

const shelterSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'o nome é obrigatório'],
            minlength: [5, 'o nome tem que ter no minimo 5 caracters']
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
            required: [true, 'numero é obrigatório'],
            validate: {
                validator: function (tel) {
                    return /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/.test(tel)
                }
            }
        },
        city: {
            type: String,
            required: [true, 'cidade é obrigatória'],
            minlength: 5
        },
        state: {
            type: String,
            required: [true, 'estado é obrigatório'],
            maxlength: [2, 'digite apenas a sigla do estado']
        }
    }
)

const shelters = mongoose.model("shelters", shelterSchema);

module.exports = shelters;
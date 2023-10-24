const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'o nome é obrigatório'],
        minlength: [3, 'o nome deve conter pelo menos 3 caracteres.']
    },
    description: String
});

const roles = mongoose.model("roles", roleSchema);

module.exports = roles;
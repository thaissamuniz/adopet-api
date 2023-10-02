const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: ['user', 'admin', 'manager'],
        require: [true, 'o nome é obrigatório'],
        minlength: [3, 'o nome deve conter pelo menos 3 caracteres.']
    },
    description: String
});

const roles = mongoose.model("roles", roleSchema);

module.exports = roles;
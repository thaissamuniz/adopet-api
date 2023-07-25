const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'nome obrigatorio']
    },
    age: {
        type: String,
        required: [true, 'idade obrigatoria']
    },
    size: {
        type: String,
        enum: ['grande', 'médio', 'pequeno'],
        required: [true, 'porte obrigatorio']
    },
    details: {
        type: String,
        required: [true, 'diga algo sobre o bichinho'],
        minlength: 3,
        maxlength: 150
    },
    city: {
        type: String,
        required: [true, 'a cidade é obrigatoria'],
        minlength: 5
    },
    state: {
        type: String,
        required: [true, 'estado é obrigatório'],
        maxlength: [2, 'digite apenas a sigla do estado']
    },
    adopted: {
        type: Boolean,
        required: [true, 'o campo adotado é obrigatorio']
    },
    shelter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'shelters',
        required: [true, 'o abrigo é obrigatório']
    }

});

const pets = mongoose.model('pets', petSchema);
module.exports = pets;
const mongoose = require('mongoose');

const adoptionSchema = new mongoose.Schema({
    pet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pets',
        required: [true, 'animal obrigatorio']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: [true, 'usuario obrigatorio']
    },
    adoptionDate: {
        type: Date,
        default: Date.now
    }
});

const adoptions = mongoose.model("adoptions", adoptionSchema);

module.exports = adoptions;
const mongoose = require('mongoose');
const baseData = require('./BaseData.js');

const userSchema = new mongoose.Schema();
userSchema.add(baseData).add({

    password: {
        type: String,
        required: [true, 'defina uma senha'],
        minlength: [6, 'a senha deve conter pelo menos 6 caracteres']
    },
    about: {
        type: String,
        maxlength: 150
    }
});

const users = mongoose.model("users", userSchema);

module.exports = users;
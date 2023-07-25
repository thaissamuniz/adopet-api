const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const adoptionSchema = new mongoose.Schema({
    petId: ObjectId,
    userId: ObjectId,
    adoptionDate: Date

});

const adoptions = mongoose.model("adoptions", adoptionSchema);

module.exports = adoptions;
const express = require('express');
const router = express.Router();
const PetController = require('../controllers/PetController');

router
    .get('/pets', PetController.getPets)
    .get('/pets/:id', PetController.getPetById)
    .post('/pets', PetController.createPet)
    .put('/pets/:id', PetController.updatePet)
    .delete('/pets/:id', PetController.deletePet)



module.exports = router;
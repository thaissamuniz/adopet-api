const express = require('express');
const router = express.Router();
const PetController = require('../controllers/PetController');
const paginate = require('../middlewares/paginate.js');

router
    .get('/pets', PetController.getPets, paginate)
    .get('/pets-available', PetController.getAvailablePets)
    .get('/pets/:id', PetController.getPetById)
    .post('/pets', PetController.createPet)
    .put('/pets/:id', PetController.updatePet)
    .delete('/pets/:id', PetController.deletePet)



module.exports = router;
const express = require('express');
const router = express.Router();
const ShelterController = require('../controllers/ShelterController');

router
    .get('/shelters', ShelterController.getShelters)
    .get('/shelters/:id', ShelterController.getShelterById)
    .post('/shelters', ShelterController.createShelter)
    .put('/shelters/:id', ShelterController.updateShelter)
    .delete('/shelters/:id', ShelterController.deleteShelter)



module.exports = router;
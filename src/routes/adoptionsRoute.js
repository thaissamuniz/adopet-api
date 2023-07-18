const express = require('express');
const router = express.Router();
const AdoptionController = require('../controllers/AdoptionController');

router
    .get('/adoptions', AdoptionController.getAdoptions)
    .post('/adoptions', AdoptionController.createAdoption)
    .delete('/adoptions/:id', AdoptionController.deleteAdoption)



module.exports = router;
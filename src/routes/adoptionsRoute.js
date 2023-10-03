const express = require('express');
const router = express.Router();
const AdoptionController = require('../controllers/AdoptionController');
const authenticationHandler = require('../middlewares/authenticationHandler');
const authorization = require('../middlewares/authorization');

router.use(authenticationHandler);
router.use(authorization);

router
    .get('/adoptions', AdoptionController.getAdoptions)
    .post('/adoptions', AdoptionController.createAdoption)
    .delete('/adoptions/:id', AdoptionController.deleteAdoption)



module.exports = router;
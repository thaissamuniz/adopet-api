const express = require('express');
const AuthController = require('../controllers/AuthController');
const router = express.Router();

router
    .post('/login/user', AuthController.loginUser)
    .post('/login/shelter', AuthController.loginShelter)

module.exports = router;
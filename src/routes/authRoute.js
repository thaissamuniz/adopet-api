const express = require('express');
const AuthController = require('../controllers/AuthController');
const router = express.Router();

router
    .post('/login/user', AuthController.loginUser)

module.exports = router;
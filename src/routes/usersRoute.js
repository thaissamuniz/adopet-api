const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router
    .get('/users', UserController.getUsers)
    .get('/users/:id', UserController.getUserById)
    .post('/users', UserController.createUser)
    .put('/users/:id', UserController.updateUser)



module.exports = router;
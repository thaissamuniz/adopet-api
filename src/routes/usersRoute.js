const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router
    .get('/users', UserController.getUsers)
    .get('/users/:id', UserController.getUserById)
    .get('/users/accountType/:accountType', UserController.getUserByType)
    .post('/users', UserController.createUser)
    .put('/users/:id', UserController.updateUser)
    .delete('/users/:id', UserController.deleteUser)



module.exports = router;
const express = require('express');
const router = express.Router();
const RoleController = require('../controllers/RoleController');

router
    .get('/roles', RoleController.getRoles)
    .get('/roles/:id', RoleController.getRoleById)
    .post('/roles', RoleController.createRole)
    .put('/roles/:id', RoleController.updateRole)
    .delete('/roles/:id', RoleController.deleteRole)



module.exports = router;
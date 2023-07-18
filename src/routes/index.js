const express = require('express');
const users = require('./usersRoute.js');
const shelters = require('./sheltersRoute.js');
const pets = require('./petsRoute.js');
const adoptions = require('./adoptionsRoute.js');

const routes = (app) => {
    app.use(
        express.json(),
        users,
        shelters,
        pets,
        adoptions
    )
}

module.exports = routes;
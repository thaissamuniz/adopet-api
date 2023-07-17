const express = require('express');
const users = require('./usersRoute.js');
const shelters = require('./sheltersRoute.js');

const routes = (app) => {
    app.use(
        express.json(),
        users,
        shelters
    )
}

module.exports = routes;
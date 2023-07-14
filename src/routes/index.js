const express = require('express');
const users = require('./usersRoute.js');

const routes = (app) => {
    app.use(
        express.json(),
        users
    )
}

module.exports = routes;
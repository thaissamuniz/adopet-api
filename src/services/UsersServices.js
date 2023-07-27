const { users } = require("../models");
const Services = require("./Services");

class UsersServices extends Services {
    constructor() {
        super(users);
    }
}

module.exports = UsersServices;
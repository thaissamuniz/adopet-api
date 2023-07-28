const { shelters } = require("../models");
const Services = require("./Services");

class ShelterServices extends Services {
    constructor() {
        super(shelters)
    }
}

module.exports = ShelterServices;
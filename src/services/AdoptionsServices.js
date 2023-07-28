const { adoptions } = require("../models");
const Services = require("./Services");

class AdoptionsServices extends Services {
    constructor() {
        super(adoptions);
    }
}

module.exports = AdoptionsServices;
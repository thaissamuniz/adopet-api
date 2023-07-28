const { pets } = require("../models");
const Services = require("./Services");

class PetsServices extends Services {
    constructor() {
        super(pets);
    }

    async getAvailable() {
        return pets.find({ adopted: false }).exec();
    }

    async getById(id, collection) {
        return pets.findById(id).populate(collection).exec();
    }
}

module.exports = PetsServices;
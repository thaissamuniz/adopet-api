const { adoptions } = require("../models");
const CRUD = require("../repository/CRUD");

class AdoptionsServices {
    static _instance;
    constructor(model) {
        this.crud = new CRUD(model)
    }

    static getInstance(model) {
        if (!AdoptionsServices._instance) {
            AdoptionsServices._instance = new AdoptionsServices(model)
        }

        return AdoptionsServices._instance;
    }

    getAllAdoptions() {
        return adoptions.find().populate("pet", "name").populate("user").exec();
    }
    getAdoptionById(id) {
        return this.crud.getDataById(id);
    }
    createAdoption(adoption) {
        return this.crud.createData(adoption);
    }

    deleteAdoption(id) {
        return this.crud.deleteData(id);
    }
}

module.exports = AdoptionsServices;
const CRUD = require("../repository/CRUD");

const { shelters } = require("../models");

class SheltersServices {
    static _instance;
    constructor(model) {
        this.crud = new CRUD(model)
    }

    static getInstance(model) {
        if (!SheltersServices._instance) {
            SheltersServices._instance = new SheltersServices(model)
        }

        return SheltersServices._instance;
    }

    getAllShelters() {
        return this.crud.getAllDatas();
    }

    getShelterById(id) {
        return this.crud.getDataById(id);
    }
    createShelter(user) {
        return this.crud.createData(user);
    }

    updateShelter(id, updatedInfo) {
        return this.crud.updateData(id, updatedInfo);
    }

    deleteShelter(id) {
        return this.crud.deleteData(id);
    }
}

module.exports = SheltersServices;
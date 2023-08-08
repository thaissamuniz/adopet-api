const { pets } = require("../models");
const CRUD = require("../repository/CRUD");

class PetsServices {
    static _instance;
    constructor(model) {
        this.crud = new CRUD(model);
    }

    static getInstance(model) {
        if (!PetsServices._instance) {
            PetsServices._instance = new PetsServices(model)
        }

        return PetsServices._instance;
    }

    getAllPets() {
        return this.crud.getAllDatas();
    }
    getPetById(id) {
        return this.crud.getDataById(id);
    }
    createPet(pet) {
        return this.crud.createData(pet)
    }

    updatePet(id, updatedInfo) {
        return this.crud.updateData(id, updatedInfo);
    }

    deletePet(id) {
        return this.crud.deleteData(id);
    }

    getAvailable() {
        return pets.find({ adopted: false }).exec();
    }

    getPetById(id) {
        return pets.findById(id).populate("shelter").exec();
    }
}

module.exports = PetsServices;
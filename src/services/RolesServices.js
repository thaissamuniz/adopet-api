const CRUD = require("../repository/CRUD");

class RolesServices {
    static _instance;
    constructor(model) {
        this.crud = new CRUD(model)
    }

    static getInstance(model) {
        if (!RolesServices._instance) {
            RolesServices._instance = new RolesServices(model)
        }

        return RolesServices._instance;
    }

    getAllRoles() {
        return this.crud.getAllDatas();
    }
    getRoleById(id) {
        return this.crud.getDataById(id);
    }
    getRoleByName(name) {
        return this.crud.getByName(name);
    }
    createRole(adoption) {
        return this.crud.createData(adoption);
    }

    updateRole(id, updatedInfo) {
        return this.crud.updateData(id, updatedInfo);
    }

    deleteRole(id) {
        return this.crud.deleteData(id);
    }
}

module.exports = RolesServices;
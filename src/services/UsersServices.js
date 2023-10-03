const CRUD = require("../repository/CRUD");
class UsersServices {
    static _instance;
    constructor(model) {
        this.crud = new CRUD(model)
    }

    static getInstance(model) {
        if (!UsersServices._instance) {
            UsersServices._instance = new UsersServices(model)
        }

        return UsersServices._instance;
    }

    getAllUsers() {
        return this.crud.getAllDatas();
    }

    getUserById(id) {
        return this.crud.getDataById(id);
    }
    getUserByAccountType(accountType) {
        return this.crud.getDataByType(accountType);
    }

    createUser(user) {
        return this.crud.createData(user);
    }

    updateUser(id, updatedInfo) {
        return this.crud.updateData(id, updatedInfo);
    }

    deleteUser(id) {
        return this.crud.deleteData(id);
    }
}

module.exports = UsersServices;
class CRUD {
    constructor(model) {
        this.model = model;
    }

    getAllDatas() {
        return this.model.find();
    }

    getDataById(id) {
        return this.model.findById(id).exec();
    }

    createData(datas) {
        let data = new this.model(datas);
        return data.save();
    }

    updateData(id, datas) {
        return this.model.findByIdAndUpdate(id, { $set: datas });
    }

    deleteData(id) {
        return this.model.findByIdAndDelete(id);
    }
}

module.exports = CRUD;
class Services {
    constructor(model) {
        this.model = model;
    }

    async getAllDatas() {
        return this.model.find();
    }

    async getDataById(id) {
        return this.model.findById(id).exec();

    }

    async createData(datas) {
        let data = new this.model(datas);
        return data.save();
    }

    async updateData(id, datas) {
        return this.model.findByIdAndUpdate(id, { $set: datas });
    }

    async deleteData(id) {
        return this.model.findByIdAndDelete(id);
    }
}

module.exports = Services;
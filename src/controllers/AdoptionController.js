const adoptions = require('../models/Adoption');
const AdoptionsServices = require('../services/AdoptionsServices.js');
const adoptionsServices = new AdoptionsServices();

class AdoptionController {
    static async getAdoptions(req, res) {
        try {
            const result = await adoptions.find().populate("pet", "name").populate("user").exec();
            if (result.length == 0) {
                res.status(422).send({ message: 'ainda não há adoções' });
            } else if (result !== null) {
                res.status(200).json(result);
            }
        } catch (error) {
            res.status(500).send(`${error.message} - erro ao recuperar os dados`);
        }
    }

    static async createAdoption(req, res) {
        try {
            const adoptionResult = await adoptionsServices.createData(req.body);
            res.status(201).send(adoptionResult.toJSON());
        } catch (error) {
            res.status(500).send(`${error.message} - erro no post`);
        }
    }

    static async deleteAdoption(req, res) {

        try {
            const { id } = req.params;
            const result = await adoptionsServices.deleteData(id);
            if (result !== null) {
                res.status(200).send({ message: 'adoção apagada com sucesso.' })
            } else {
                res.send('adoção não encontrada.')
            }
        } catch (error) {
            res.status(500).send(`${error.message} - erro ao deletar adoção`);
        }
    }
}

module.exports = AdoptionController;
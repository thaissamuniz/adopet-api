const shelters = require('../models/Shelter.js');
const ShelterServices = require('../services/SheltersServices.js');
const sheltersService = ShelterServices.getInstance(shelters);

class ShelterController {
    static async getShelters(req, res) {
        try {
            const result = await sheltersService.getAllShelters();

            if (result !== null) {
                res.status(200).json(result)
            }

        } catch (error) {
            res.status(500).send(`${error.message} - erro ao recuperar os dados`);
        }
    }

    static async getShelterById(req, res) {
        try {
            const { id } = req.params;

            const shelter = await sheltersService.getShelterById(id);
            if (shelter !== null) {
                res.status(200).send(shelter);
            } else {
                res.status(422).send('id não encontrado');
            }
        } catch (error) {
            res.status(500).send(`${error.message} - erro ao procurar abrigo por id`);
        }
    }

    static async createShelter(req, res) {
        try {
            const shelterResult = await sheltersService.createShelter(req.body)
            res.status(201).send(shelterResult.toJSON());
        } catch (error) {
            res.status(500).send(`${error.message} - erro no post`);
        }
    }

    static async updateShelter(req, res) {
        try {
            const { id } = req.params;

            let shelter = await sheltersService.updateShelter(id, req.body);
            if (shelter !== null) {
                res.status(200).send({ message: 'abrigo atualizado co sucesso' })
            } else {
                res.status(422).send('abrigo não localizado')
            }
        } catch (error) {
            res.status(500).send(`${error.message} - erro ao atualizar abrigo`);
        }
    }

    static async deleteShelter(req, res) {
        const { id } = req.params;

        try {
            const shelter = await sheltersService.deleteShelter(id);
            if (shelter !== null) {
                res.status(200).send({ message: 'abrigo apagado com sucesso.' });
            } else {
                res.send('abrigo não localizado')
            }
        } catch (error) {
            res.status(500).send(`${error.message} - erro ao deletar abrigo`);
        }
    }
}

module.exports = ShelterController;
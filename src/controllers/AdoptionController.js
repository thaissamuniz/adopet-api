const { adoptions, pets } = require('../models');
const AdoptionsService = require('../services/AdoptionsServices.js');

const adoptionsService = AdoptionsService.getInstance(adoptions);

class AdoptionController {
    static async getAdoptions(req, res) {
        try {
            const result = await adoptionsService.getAllAdoptions();
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
            var petSelecionado = await pets.findById(req.body.pet);
            if (petSelecionado.adopted == true) {
                return res.status(403).send('esse animal já foi adotado');
            }

            const adoptionResult = await adoptionsService.createAdoption(req.body);
            await pets.findByIdAndUpdate(req.body.pet, { adopted: true });
            res.status(201).send(adoptionResult.toJSON());
        } catch (error) {
            res.status(500).send(`${error.message} - erro no post`);
        }
    }

    static async deleteAdoption(req, res, next) {
        try {
            const { id } = req.params;
            console.log(req.body);
            const result = await adoptionsService.deleteAdoption(id);
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
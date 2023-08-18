const { pets, adoptions } = require('../models');
const AdoptionsServices = require('../services/AdoptionsServices');
const PetsService = require('../services/PetsServices');

const adoptionsService = AdoptionsServices.getInstance(adoptions);
const petsService = PetsService.getInstance(pets);

class PetController {
    static async getPets(req, res) {
        try {
            const result = await petsService.getAllPets();
            if (result.length == 0) {
                res.send('nenhum animal cadastrado');
            } else if (result !== null) {
                res.status(200).json(result);
            }
        } catch (error) {
            res.status(500).send(`${error.message} - erro ao recuperar os dados`);
        }
    }

    static async getAvailablePets(req, res) {
        try {
            const result = await petsService.getAvailable();
            if (result.length == 0) {
                res.send('não há animais disponiveis para adoção.')
            } else if (result !== null) {
                res.status(200).json(result);
            }
        } catch (error) {
            res.status(500).send(`${error.message} - erro ao recuperar os dados`);
        }
    }

    static async getPetById(req, res, next) {
        try {
            const { id } = req.params;
            const pet = await petsService.getPetById(id)
            if (pet !== null) {
                res.status(200).send(pet)
            } else {
                res.status(422).send('animal não encontrado.')
            }
        } catch (error) {
            // res.status(500).send(`${error.message} - erro ao procurar animal por id`);
            next(error)
        }
    }

    static async createPet(req, res, next) {
        try {
            const petResult = await petsService.createPet(req.body);
            res.status(201).send(petResult.toJSON())
        } catch (error) {
            // res.status(500).send(`${error.message} - erro no post`);
            next(error)
        }
    }


    static async updatePet(req, res) {
        try {
            const { id } = req.params;
            const updatedData = await petsService.updatePet(id, req.body);
            if (updatedData !== null) {
                if (req.body.adopted == true) {
                    await adoptionsService.createAdoption({ pet: id, user: "64c0134e556c5354ff41004e" })
                }
                res.status(200).send({ message: 'animal atualizado com sucesso' })
            } else {
                res.send({ message: 'animal não localizado.' })
            }

        } catch (error) {
            res.status(500).send(`${error.message} - erro ao atualizar animal`);
        }
    }

    static async deletePet(req, res) {
        try {
            const { id } = req.params;
            const pet = await petsService.deletePet(id);
            if (pet !== null) {
                res.status(200).send({ message: 'animal apagado com sucesso.' });
            } else {
                res.send('animal não localizado');
            }
        } catch (error) {
            res.status(500).send(`${error.message} - erro ao deletar animal`);
        }
    }
}

module.exports = PetController;
// const Adoption = require('../models/Adoption');
const pets = require('../models/Pet.js');

class PetController {
    static async getPets(req, res) {
        try {
            const result = await pets.find();
            if (result.length == 0) {
                res.send('nenhum animal cadastrado');
            } else if (result !== null) {
                res.status(200).json(result);
            }
        } catch (error) {
            res.status(500).send(`${error.message} - erro ao recuperar os dados`);
        }
    }

    // static async getAvailablePets(req, res) {
    //     try {
    //         const pets = JSON.parse(fs.readFileSync("pets.json"));
    //         const availablePets = pets.filter(pet => pet.adotado !== true);
    //         res.send(availablePets);
    //     } catch (error) {
    //         res.status(500).send(`${error.message} - erro ao recuperar os dados`);
    //     }
    // }

    static async getPetById(req, res) {
        try {
            const { id } = req.params;
            const pet = await pets.findById(id)
                .populate("shelter")
                .exec();
            if (pet !== null) {
                res.status(200).send(pet)
            } else {
                res.status(422).send('animal não encontrado.')
            }
        } catch (error) {
            res.status(500).send(`${error.message} - erro ao procurar animal por id`);
        }
    }

    static async createPet(req, res) {
        try {
            let pet = new pets(req.body);
            const petResult = await pet.save();
            res.status(201).send(petResult.toJSON())
        } catch (error) {
            res.status(500).send(`${error.message} - erro no post`);
        }
    }

    // static async updatePet(req, res) {
    //     const { id } = req.params;
    //     const updatedData = req.body;

    //     try {
    //         let pets = JSON.parse(fs.readFileSync("pets.json"));
    //         const targetIdIndex = pets.findIndex(pet => pet.id === Number(id));
    //         const updated = { ...pets[targetIdIndex], ...updatedData };
    //         pets[targetIdIndex] = updated;

    //         if (updated.adotado == true) {

    //             const adocoesExistentes = JSON.parse(fs.readFileSync("adoption.json"));
    //             const novaAdocao = new Adoption(defineId(adocoesExistentes), id, 'qualquer');
    //             const adocoesAtualizadas = [...adocoesExistentes, novaAdocao]
    //             fs.writeFileSync("adoption.json", JSON.stringify(adocoesAtualizadas));

    //         }


    //         fs.writeFileSync("pets.json", JSON.stringify(pets));
    //         res.status(200).json(updated)
    //     } catch (error) {
    //         res.status(500).send(`${error.message} - erro ao atualizar animal`);
    //     }
    // }

    static async deletePet(req, res) {
        try {
            const { id } = req.params;
            const pet = await pets.findByIdAndDelete(id);
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
const fs = require('fs');
const Adoption = require('../models/Adoption');

const defineId = (lista) => {
    let id;

    if (lista.length > 0) {
        let ultimoId = Number(lista[lista.length - 1].id);
        id = ultimoId + 1;
    } else {
        id = 1;
    }

    return id;
}


class AdoptionController {
    static async getAdoptions(req, res) {
        try {
            const adoptions = JSON.parse(fs.readFileSync("adoption.json"));
            if (adoptions.length < 1) {
                res.send('nenhum animal cadastrado')
            } else {
                res.send(adoptions)
            }
        } catch (error) {
            res.status(500).send(`${error.message} - erro ao recuperar os dados`);
        }
    }

    static async createAdoption(req, res) {
        const adoptionInfos = req.body;
        try {
            if (adoptionInfos) {
                const existingAdoptions = JSON.parse(fs.readFileSync("adoption.json"));
                const adoption = new Adoption(defineId(existingAdoptions), adoptionInfos.petId, 'qualquer')
                const updatedAdoptions = [...existingAdoptions, adoption];
                fs.writeFileSync("adoption.json", JSON.stringify(updatedAdoptions));
                res.status(201).json(adoption);
            } else {
                res.status(422).send('os campos nome,id , email e senha são obrigatórios.');
            }
        } catch (error) {
            res.status(500).send(`${error.message} - erro no post`);
        }
    }

    static async deleteAdoption(req, res) {
        const { id } = req.params;

        try {
            let adoptions = JSON.parse(fs.readFileSync("adoption.json"));
            const updatedData = adoptions.filter(adoption => adoption.id !== Number(id));
            fs.writeFileSync("adoption.json", JSON.stringify(updatedData));
            res.send('adoção deletada com sucesso');
        } catch (error) {
            res.status(500).send(`${error.message} - erro ao deletar animal`);
        }
    }
}

module.exports = AdoptionController;
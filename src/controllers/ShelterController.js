const fs = require('fs');


class ShelterController {
    static async getShelters(req, res) {
        try {
            const shelters = JSON.parse(fs.readFileSync("shelter.json"));
            if (shelters.length < 1) {
                res.send('nenhum abrigo cadastrado')
            } else {
                res.send(shelters)
            }
        } catch (error) {
            res.status(500).send(`${error.message} - erro ao recuperar os dados`);
        }
    }

    static async getShelterById(req, res) {
        const { id } = req.params;
        try {
            const shelters = JSON.parse(fs.readFileSync("shelter.json"));
            const shelterByIdList = shelters.filter(shelter => shelter.id === Number(id));

            if (shelterByIdList.length < 1) {
                res.send('id não existente')
            } else if (id && Number(id)) {
                const shelterById = shelterByIdList[0];
                res.send(shelterById);
            } else {
                res.status(422).send('id inválido')
            }
        } catch (error) {
            res.status(500).send(`${error.message} - erro ao procurar abrigo por id`);
        }
    }

    static async createShelter(req, res) {
        const newShelter = req.body;
        try {
            if (newShelter.nome && newShelter.telefone && newShelter.cidade && newShelter.estado && newShelter.id) {
                const shelters = JSON.parse(fs.readFileSync("shelter.json"));
                const sheltersUpdated = [...shelters, newShelter]
                fs.writeFileSync("shelter.json", JSON.stringify(sheltersUpdated));
                res.status(201).json(newShelter)
            } else {
                res.status(422).send('os campos nome,id , email e senha são obrigatórios.');
            }
        } catch (error) {
            res.status(500).send(`${error.message} - erro no post`);
        }
    }

    static async updateShelter(req, res) {
        const { id } = req.params;
        const updatedData = req.body;

        try {
            let shelters = JSON.parse(fs.readFileSync("shelter.json"));
            const targetIdIndex = shelters.findIndex(shelter => shelter.id === Number(id));
            const updated = { ...shelters[targetIdIndex], ...updatedData };
            shelters[targetIdIndex] = updated;
            fs.writeFileSync("shelter.json", JSON.stringify(shelters));
            res.status(200).json(updated)
        } catch (error) {
            res.status(500).send(`${error.message} - erro ao atualizar abrigo`);
        }
    }

    static async deleteShelter(req, res) {
        const { id } = req.params;

        try {
            let shelters = JSON.parse(fs.readFileSync("shelter.json"));
            const updatedData = shelters.filter(shelter => shelter.id !== Number(id));
            fs.writeFileSync("shelter.json", JSON.stringify(updatedData));
            res.send('abrigo deletado com sucesso')
        } catch (error) {
            res.status(500).send(`${error.message} - erro ao deletar abrigo`);
        }
    }
}

module.exports = ShelterController;
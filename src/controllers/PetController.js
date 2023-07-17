const fs = require('fs');


class PetController {
    static async getPets(req, res) {
        try {
            const pets = JSON.parse(fs.readFileSync("pets.json"));
            if (pets.length < 1) {
                res.send('nenhum animal cadastrado')
            } else {
                res.send(pets)
            }
        } catch (error) {
            res.status(500).send(`${error.message} - erro ao recuperar os dados`);
        }
    }

    static async getPetById(req, res) {
        const { id } = req.params;
        try {
            const pets = JSON.parse(fs.readFileSync("pets.json"));
            const petByIdList = pets.filter(pet => pet.id === Number(id));

            if (petByIdList.length < 1) {
                res.send('id não existente')
            } else if (id && Number(id)) {
                const petById = petByIdList[0];
                res.send(petById);
            } else {
                res.status(422).send('id inválido')
            }
        } catch (error) {
            res.status(500).send(`${error.message} - erro ao procurar animal por id`);
        }
    }

    static async createPet(req, res) {
        const newPet = req.body;
        try {
            if (newPet.nome && newPet.id) {
                const pets = JSON.parse(fs.readFileSync("pets.json"));
                const petsUpdated = [...pets, newPet]
                fs.writeFileSync("pets.json", JSON.stringify(petsUpdated));
                res.status(201).json(newPet);
            } else {
                res.status(422).send('os campos nome,id , email e senha são obrigatórios.');
            }
        } catch (error) {
            res.status(500).send(`${error.message} - erro no post`);
        }
    }

    static async updatePet(req, res) {
        const { id } = req.params;
        const updatedData = req.body;

        try {
            let pets = JSON.parse(fs.readFileSync("pets.json"));
            const targetIdIndex = pets.findIndex(pet => pet.id === Number(id));
            const updated = { ...pets[targetIdIndex], ...updatedData };
            pets[targetIdIndex] = updated;
            fs.writeFileSync("pets.json", JSON.stringify(pets));
            res.status(200).json(updated)
        } catch (error) {
            res.status(500).send(`${error.message} - erro ao atualizar animal`);
        }
    }

    static async deletePet(req, res) {
        const { id } = req.params;

        try {
            let pets = JSON.parse(fs.readFileSync("pets.json"));
            const updatedData = pets.filter(pet => pet.id !== Number(id));
            fs.writeFileSync("pets.json", JSON.stringify(updatedData));
            res.send('animal deletado com sucesso')
        } catch (error) {
            res.status(500).send(`${error.message} - erro ao deletar animal`);
        }
    }
}

module.exports = PetController;
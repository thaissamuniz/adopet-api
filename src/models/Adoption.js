class Adoption {
    constructor(id, idPet, usuario) {
        this.id = id,
        this.idPet = idPet,
        this.usuario = usuario,
        this.data = new Date();
    }
}

module.exports = Adoption;
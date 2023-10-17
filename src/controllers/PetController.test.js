const { pets, adoptions } = require('../models');
const AdoptionsServices = require('../services/AdoptionsServices');
const PetsService = require('../services/PetsServices');
const PetController = require('./PetController');

const petsService = PetsService.getInstance(pets);

const mockPetService = jest.mocked(petsService);

describe('PetController:getPets', () => {
    const req = {}

    const mockNext = jest.fn();
    test('deve retornar status 422 caso não haja animais disponiveis para adoção.', async () => {
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn()
        };
        mockPetService.getAllPets = jest.fn().mockReturnValue([]);
        await PetController.getPets(req, mockResponse, mockNext);

        expect(mockPetService.getAllPets).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(422);
        expect(mockResponse.send).toHaveBeenCalledWith('nenhum animal cadastrado');
        expect(mockNext).not.toHaveBeenCalled();
    });

    test('deve chamar o próximo middleware se o resultado não for nulo', async () => {
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn()
        };

        mockPetService.getAllPets = jest.fn().mockReturnValue([{}, {}]);
        await PetController.getPets(req, mockResponse, mockNext);

        expect(mockResponse.status).not.toHaveBeenCalled();
        expect(mockNext).toHaveBeenCalled();
    });
});


describe('PetController:getAvailablePets', () => {
    const mockResponse = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn()
    };
    test('deve retornar status 422 caso não haja animais disponiveis para adoção.', async () => {
        mockPetService.getAvailable = jest.fn().mockResolvedValue([]);
        await PetController.getAvailablePets(null, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(422);
    });

    test('deve retornar status 200 e os animais disponiveis para adoção.', async () => {
        mockPetService.getAvailable = jest.fn().mockResolvedValue([{}, {}]);
        await PetController.getAvailablePets(null, mockResponse);

        expect(mockPetService.getAvailable).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith([{}, {}]);
    });


    test('deve retornar status 500 caso algo dê erro no bloco try', async () => {
        mockPetService.getAvailable = jest.fn().mockRejectedValue(new Error());
        await PetController.getAvailablePets(null, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
    });
});

describe('PetController:getPetById', () => {
    const mockNext = jest.fn();
    const mockResponse = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn()
    };
    test('deve retornar status 200 ao encontrar o pet', async () => {
        const req = {
            params: {
                id: 1
            }
        }
        const pet = {
            name: ""
        }

        mockPetService.getPetById = jest.fn().mockResolvedValue(pet);
        await PetController.getPetById(req, mockResponse, mockNext);

        expect(mockPetService.getPetById).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockNext).not.toHaveBeenCalled();

    });

    test('deve retornar status 422 caso não encontre o pet', async () => {
        const req = {
            params: {
                id: 1
            }
        }

        mockPetService.getPetById = jest.fn().mockResolvedValue(null);
        await PetController.getPetById(req, mockResponse, mockNext);

        expect(mockPetService.getPetById).toHaveBeenCalled();
        expect(mockResponse.send).toHaveBeenCalledWith('animal não encontrado.');
        expect(mockResponse.status).toHaveBeenCalledWith(422);
        expect(mockNext).not.toHaveBeenCalled();

    });

    test('Deve chamar o next caso algo dê erro no bloco try', async () => {
        const req = {
            params: {
                id: 1
            }
        }
        mockPetService.getPetById = jest.fn().mockRejectedValue(new Error());
        await PetController.getPetById(req, mockResponse, mockNext);

        expect(mockNext).toHaveBeenCalled();
    });
});

describe('PetController:createPet', () => {
    const mockNext = jest.fn();
    const req = {
        body: {
            name: "",
            age: ""
        }
    }
    const mockResponse = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn()
    };
    test('Deve retornar 200 ao cadastrar um novo pet', async () => {
        mockPetService.createPet = jest.fn().mockResolvedValue(req.body);

        await PetController.createPet(req, mockResponse, mockNext);

        expect(mockPetService.createPet).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(201);
    });
    test('Deve chamar o next caso algo dê erro no bloco try', async () => {
        const req = {
            params: {
                id: 1
            }
        }
        mockPetService.createPet = jest.fn().mockRejectedValue(new Error());
        await PetController.createPet(req, mockResponse, mockNext);

        expect(mockNext).toHaveBeenCalled();
    });
});

describe('PetController:updatePet', () => {
    const mockNext = jest.fn();
    const mockResponse = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn()
    };

    const req = {
        params: {
            id: 1
        },
        body: {
        }
    }
    test('deve retornar 200 ao atualizar um pet', async () => {
        mockPetService.updatePet = jest.fn().mockResolvedValue(req.body);
        await PetController.updatePet(req, mockResponse, mockNext);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.send).toHaveBeenCalledWith({ message: 'animal atualizado com sucesso' });
    });

    test('deve retornar uma mensagem dizendo animal não localizado', async () => {
        mockPetService.updatePet = jest.fn().mockResolvedValue(null);
        await PetController.updatePet(req, mockResponse, mockNext);

        expect(mockResponse.send).toHaveBeenCalledWith({ message: 'animal não localizado.' });
    });

    test('deve chamar o next caso algo de errado no bloco try', async () => {
        mockPetService.updatePet = jest.fn().mockRejectedValue(new Error());
        await PetController.updatePet(req, mockResponse, mockNext);

        expect(mockNext).toHaveBeenCalled();
    });
});

describe('PetController:deletePet', () => {
    const mockNext = jest.fn();
    const mockResponse = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn()
    };

    const req = {
        params: {
            id: 1
        },
        body: {
        }
    }
    test('deve retornar 200 ao apagar um pet', async () => {
        mockPetService.deletePet = jest.fn().mockResolvedValue(req.params.id);
        await PetController.deletePet(req, mockResponse, mockNext);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.send).toHaveBeenCalledWith({ message: 'animal apagado com sucesso.' });
        expect(mockNext).not.toHaveBeenCalled();

    });

    test('deve retornar uma mensagem dizendo animal não localizado', async () => {
        mockPetService.deletePet = jest.fn().mockResolvedValue(null);
        await PetController.deletePet(req, mockResponse, mockNext);

        expect(mockResponse.status).toHaveBeenCalledWith(422);
        expect(mockResponse.send).toHaveBeenCalledWith({ message: 'animal não localizado.' });
        expect(mockNext).not.toHaveBeenCalled();

    });

    test('deve chamar o next caso algo de errado no bloco try', async () => {
        mockPetService.deletePet = jest.fn().mockRejectedValue(new Error());
        await PetController.deletePet(req, mockResponse, mockNext);

        expect(mockNext).toHaveBeenCalled();
    });
});
const { adoptions, pets } = require('../models');
const AdoptionsService = require('../services/AdoptionsServices.js');
const AdoptionsController = require('./AdoptionController');
const adoptionsService = AdoptionsService.getInstance(adoptions);
jest.mock('../models');

const mockedAdoptionsService = jest.mocked(adoptionsService);
const mockResponse = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
    json: jest.fn()
};

describe("AdoptionController:getAdoptions", () => {
    test('Deve retornar status 422 e a mensagem apropriada quando não há adoções', async () => {
        mockedAdoptionsService.getAllAdoptions = jest.fn().mockResolvedValue([]);
        await AdoptionsController.getAdoptions(null, mockResponse);

        expect(mockedAdoptionsService.getAllAdoptions).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(422);
        expect(mockResponse.send).toHaveBeenCalledWith({ message: 'ainda não há adoções' });
    });

    test('Deve retornar as adoções presentes na coleção', async () => {
        mockedAdoptionsService.getAllAdoptions = jest.fn().mockResolvedValue([{}, {}]);
        await AdoptionsController.getAdoptions(null, mockResponse);

        expect(mockedAdoptionsService.getAllAdoptions).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith([{}, {}]);
    });

    test('Deve retornar status 500 caso algo dê erro no bloco try', async () => {
        mockedAdoptionsService.getAllAdoptions = jest.fn().mockRejectedValue(new Error());
        await AdoptionsController.getAdoptions(null, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
    });
});

describe("AdoptionController:createAdoption", () => {
    const mockedPets = jest.mocked(pets);

    test("deve retornar 403 caso a propriedade adopted seja true", async () => {
        const req = {
            body: {
                pet: 1
            }
        }
        const pet = {
            name: "",
            age: "",
            adopted: true
        }
        mockedPets.findById.mockResolvedValue(pet);

        await AdoptionsController.createAdoption(req, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(403);
        expect(mockResponse.send).toHaveBeenCalledWith('esse animal já foi adotado');
    });

    test("deve retornar 201 e criar uma nova adoção", async () => {

        const req = {
            body: {
                pet: 1,
                name: "",
                age: "",
                adopted: false
            }
        }

        mockedPets.findById.mockResolvedValue(req.body.pet);

        mockedAdoptionsService.createAdoption = jest.fn().mockResolvedValue(req.body)
        await AdoptionsController.createAdoption(req, mockResponse);

        expect(mockedAdoptionsService.createAdoption).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(201);
    });

    test('Deve retornar status 500 caso algo dê erro no bloco try', async () => {
        mockedAdoptionsService.createAdoption = jest.fn().mockRejectedValue(new Error());
        await AdoptionsController.createAdoption(null, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
    });
});

describe("AdoptionController:deleteAdoption", () => {
    test("Deve retornar 200 informando sucesso ao apagar uma adoção e uma mensagem de secesso.", async () => {
        const req = {
            params: {
                id: 1
            }
        }
        mockedAdoptionsService.deleteAdoption = jest.fn().mockResolvedValue(req.params.id);
        await AdoptionsController.deleteAdoption(req, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.send).toHaveBeenCalledWith({ message: 'adoção apagada com sucesso.' });
    });

    test("Deve retornar uma mensagen dizendo que e adoção não foi encontrada", async () => {
        const req = {
            params: {
                id: null
            }
        }
        mockedAdoptionsService.deleteAdoption = jest.fn().mockResolvedValue(null);
        await AdoptionsController.deleteAdoption(req, mockResponse);

        expect(mockResponse.send).toHaveBeenCalledWith('adoção não encontrada.');
    });

    test('Deve retornar status 500 caso algo dê erro no bloco try', async () => {
        mockedAdoptionsService.deleteAdoption = jest.fn().mockRejectedValue(new Error());
        await AdoptionsController.deleteAdoption(null, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
    });
});
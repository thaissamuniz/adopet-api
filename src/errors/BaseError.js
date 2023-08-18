class BaseError extends Error {
    constructor(msg = 'algo deu errado', status = 500) {
        super();
        this.message = msg;
        this.status = status;
    }

    sendResponse(res) {
        res.status(this.status).send({
            msg: this.message,
            status: this.status
        });
    }
}

module.exports = BaseError;
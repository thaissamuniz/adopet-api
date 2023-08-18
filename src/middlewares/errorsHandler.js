const mongoose = require("mongoose");

function errorHandler(err, req, res, next) {
    if (err instanceof mongoose.Error.CastError) {
        res.send('um ou mais dados foram passados incorretamente.')
    } else if (err instanceof mongoose.Error.ValidationError) {
        const errorsMessages = Object.values(err.errors).map(err => err.message).join('; ')
        res.status(400).send(errorsMessages);
    }
}

module.exports = errorHandler;
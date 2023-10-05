async function paginate(req, res, next) {
    try {
        let { offsetLimit = 9, page = 1, orderField = "_id", order = 1 } = req.query;
        offsetLimit = parseInt(offsetLimit);
        page = parseInt(page);
        order = parseInt(order);

        const result = req.resultado;

        if (offsetLimit > 0 && page > 0) {
            const paginateResult = await result.find()
                .sort({ [orderField]: order })
                .skip((page - 1) * offsetLimit)
                .limit(offsetLimit)
                .exec();

            res.status(200).json(paginateResult);
        } else {
            res.status(400).send('não foi possivel paginar');
        }
    } catch (error) {
        next(error);
    }
}

module.exports = paginate;
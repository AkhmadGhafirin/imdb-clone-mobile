function errorHandling(err, req, res, next) {
    console.log(err?.statusCode, err?.message, 'err middleware');

    res.status(err?.statusCode).json({
        statusCode: err?.statusCode,
        message: err?.message
    })
}

module.exports = errorHandling 
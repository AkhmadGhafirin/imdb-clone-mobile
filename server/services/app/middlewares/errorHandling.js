'use strict'

function errorHandling(err, req, res, next) {
    console.log(err)
    let message = 'Internal Server Error'
    let code = 500
    switch (err.name) {
        case 'SequelizeValidationError':
            code = 400
            for (let i = 0; i < err?.errors.length; i++) {
                message = err?.errors[i].message
                break;
            }
            break;
        case 'SequelizeUniqueConstraintError':
            code = 400
            for (let i = 0; i < err?.errors.length; i++) {
                message = err?.errors[i].message
                break;
            }
            break;
        case 'LoginErrorEmpty':
            code = 400
            message = err?.type === 'emptyEmail' ? 'Email is required!' : 'Password is required!'
            break;
        case 'LoginError':
            code = 401
            message = 'invalid email/password'
            break;
        case 'Unauthenticated':
            code = 401
            message = 'Error authentication'
            break;
        case 'JsonWebTokenError':
            code = 401
            message = 'Error authentication'
            break;
        case 'NotBeforeError':
            code = 401
            message = 'Error authentication'
            break;
        case 'TokenExpiredError':
            code = 401
            message = 'Your session has expired!'
            break;
        case 'Forbidden':
            code = 403
            message = 'Forbidden error in authorization'
            break;
        case 'NotFound':
            code = 404
            message = 'Data not found'
            break;
        default:
            code = 500
            message = 'Internal Server Error'
            break;
    }
    res.status(code).json({
        message
    })
}

module.exports = errorHandling
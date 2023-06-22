'use strict'

function errorHandling(err, req, res, next) {
    console.log(err)
    let message = 'Internal Server Error'
    let code = 500
    switch (err.name) {
        case 'RegisterEmptyEmail':
            code = 400
            message = 'Email is required'
            break;
        case 'RegisterEmptyPassword':
            code = 400
            message = 'Password is required'
            break;
        case 'RegisterEmailUniqueError':
            code = 400
            message = 'User already exists'
            break;
        case 'LoginEmptyEmail':
            code = 400
            message = 'Email is required'
            break;
        case 'LoginEmptyPassword':
            code = 400
            message = 'Password is required'
            break;
        case 'LoginError':
            code = 401
            message = 'invalid email or password'
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
'use strict'
const jwt = require('jsonwebtoken')

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'inisecretkeyboss'

const generateToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET_KEY)
}

const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET_KEY)
}

module.exports = { generateToken, verifyToken }

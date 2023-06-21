'use strict'
const bcrypt = require('bcryptjs')

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

const comparePassword = (inputPassword, userPassword) => {
    return bcrypt.compareSync(inputPassword, userPassword)
}

module.exports = { hashPassword, comparePassword }
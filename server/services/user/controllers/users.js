'use strict'

const User = require('../models/user')

const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController {
    static async register(req, res, next) {
        try {
            const { email, password, username, phoneNumber, address } = req.body
            const registeredUser = await User.createUser({ email, password, role: 'Admin', username, phoneNumber, address })
            res.status(201).json({
                id: registeredUser.id,
                email: registeredUser.email,
                role: registeredUser.role,
                username: registeredUser.username,
                phoneNumber: registeredUser.phoneNumber,
                address: registeredUser.address,
            })
        } catch (err) {
            next(err)
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            console.log(req.body, 'login body');
            // if (!email) throw { name: 'LoginErrorEmpty', type: 'emptyEmail' }
            // if (!password) throw { name: 'LoginErrorEmpty', type: 'emptyPassword' }

            const loginUser = await User.findByEmail(email)
            console.log(loginUser, '<<<<<< LOGINUSER');

            // if (!loginUser) throw { name: 'LoginError' }
            // if (!comparePassword(password, loginUser.password)) throw { name: 'LoginError' }

            res.status(200).json({
                message: 'BERHASIL LOGIN'
                // id: loginUser.id,
                // username: loginUser.username,
                // email: loginUser.email,
                // role: loginUser.role,
                // access_token: generateToken({ id: loginUser.id })
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController
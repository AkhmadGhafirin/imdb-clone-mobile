'use strict'

const User = require('../models/user')

const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController {
    static async register(req, res, next) {
        try {
            const { email, password, username, phoneNumber, address } = req.body

            if (!email) throw { name: 'RegisterEmptyEmail' }
            if (!password) throw { name: 'RegisterEmptyPassword' }

            const findUser = await User.findByEmail(email)

            if (findUser) throw { name: 'RegisterEmailUniqueError' }

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

            if (!email) throw { name: 'LoginEmptyEmail' }
            if (!password) throw { name: 'LoginEmptyPassword' }

            const loginUser = await User.findByEmail(email)

            if (!loginUser) throw { name: 'LoginError' }
            if (!comparePassword(password, loginUser.password)) throw { name: 'LoginError' }

            res.status(200).json({
                id: loginUser._id,
                username: loginUser.username,
                email: loginUser.email,
                role: loginUser.role,
                access_token: generateToken({ _id: loginUser._id })
            })
        } catch (err) {
            next(err)
        }
    }

    static async findAll(req, res, next) {
        try {
            const users = await User.findAll()
            res.status(200).json(users)
        } catch (err) {
            next(err)
        }
    }

    static async findById(req, res, next) {
        try {
            const { _id } = req.params

            const user = await User.findById(_id)

            if (!user) throw { name: 'NotFound' }

            res.status(200).json(user)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController
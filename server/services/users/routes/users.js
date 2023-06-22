'use strict'

const express = require('express')
const UserController = require('../controllers/users')
const router = express.Router()

router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.get('/', UserController.findAll)
router.get('/:_id', UserController.findById)

module.exports = router
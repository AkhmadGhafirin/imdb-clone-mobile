'use strict'
const express = require('express')
const userRouter = require('./users')
const movieRouter = require('./movies')
const publicRouter = require('./public')
const genreRouter = require('./genres')
const router = express.Router()

router.use(userRouter)
router.use('/movies', movieRouter)
router.use('/public', publicRouter)
router.use('/genres', genreRouter)

module.exports = router
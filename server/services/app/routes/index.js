'use strict'
const express = require('express')
const movieRouter = require('./movies')
const publicRouter = require('./public')
const genreRouter = require('./genres')
const router = express.Router()

router.use('/movies', movieRouter)
router.use('/public', publicRouter)
router.use('/genres', genreRouter)

module.exports = router
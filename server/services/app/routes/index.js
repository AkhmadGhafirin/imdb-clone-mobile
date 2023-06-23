'use strict'
const express = require('express')
const movieRouter = require('./movies')
const genreRouter = require('./genres')
const router = express.Router()

router.use('/movies', movieRouter)
router.use('/genres', genreRouter)

module.exports = router
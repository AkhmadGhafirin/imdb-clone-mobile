'use strict'
const express = require('express')
const MovieController = require('../controllers/movies')
const router = express.Router()

router.get('/', MovieController.fetchMovies)
router.post('/', MovieController.createMovie)
router.get('/:id', MovieController.fetchMovieById)
router.put('/:id', MovieController.updateMovie)
router.delete('/:id', MovieController.deleteMovie)

module.exports = router
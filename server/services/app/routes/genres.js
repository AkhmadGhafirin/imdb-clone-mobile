'use strict'
const express = require('express')
const GenreController = require('../controllers/genres')
const router = express.Router()

router.get('/', GenreController.fetchGenres)
router.get('/:id', GenreController.fetchGenreById)
router.post('/', GenreController.createGenre)
router.put('/:id', GenreController.updateGenre)
router.delete('/:id', GenreController.deleteGenre)

module.exports = router
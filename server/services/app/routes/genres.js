'use strict'
const express = require('express')
const GenreController = require('../controllers/genres')
// const authentication = require('../middlewares/authentication')
const router = express.Router()

// router.get('/', authentication, GenreController.fetchGenres)
// router.get('/:id', authentication, GenreController.fetchGenreById)
// router.post('/', authentication, GenreController.createGenre)
// router.put('/:id', authentication, GenreController.updateGenre)
// router.delete('/:id', authentication, GenreController.deleteGenre)

router.get('/', GenreController.fetchGenres)
router.get('/:id', GenreController.fetchGenreById)
router.post('/', GenreController.createGenre)
router.put('/:id', GenreController.updateGenre)
router.delete('/:id', GenreController.deleteGenre)

module.exports = router
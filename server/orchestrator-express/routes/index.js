const express = require('express')
const Controller = require('../controllers')
const router = express.Router()

router.post('/users/login', Controller.loginUser)
router.post('/users/register', Controller.registerUser)
router.delete('/users/:_id', Controller.deleteUser)
router.get('/movies', Controller.fetchMovies)
router.post('/movies', Controller.createMovie)
router.put('/movies/:id', Controller.updateMovie)
router.get('/movies/:id', Controller.fetchMovieById)
router.get('/movies/:slug', Controller.fetchMovieBySlug)

module.exports = router
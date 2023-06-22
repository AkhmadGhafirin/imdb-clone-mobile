const axios = require('axios')

class Controller {
    static async loginUser(req, res, next) {
        try {

        } catch (err) {
            next(err)
        }
    }

    static async registerUser(req, res, next) {
        try {

        } catch (err) {
            next(err)
        }
    }

    static async deleteUser(req, res, next) {
        try {
            const { _id } = req.params
        } catch (err) {
            next(err)
        }
    }

    static async fetchMovies(req, res, next) {
        try {

        } catch (err) {
            next(err)
        }
    }

    static async fetchMovieBySlug(req, res, next) {
        try {
            const { slug } = req.params
        } catch (err) {
            next(err)
        }
    }

    static async fetchMovieById(req, res, next) {
        try {
            const { id } = req.params
        } catch (err) {
            next(err)
        }
    }

    static async createMovie(req, res, next) {
        try {

        } catch (err) {
            next(err)
        }
    }

    static async updateMovie(req, res, next) {
        try {

        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller
const axios = require('axios')
const redis = require('../config/redis')

const APP_SERVER_URL = process.env.APP_SERVER_URL || 'http://localhost:3001'
const USER_SERVER_URL = process.env.USER_SERVER_URL || 'http://localhost:3002'

class Controller {
    static async loginUser(req, res, next) {
        try {
            const { email, password } = req.body
            const { data } = await axios.post(USER_SERVER_URL + '/users/login', {
                email, password
            })
            res.status(200).json(data)
        } catch (err) {
            next(err?.response?.data)
        }
    }

    static async registerUser(req, res, next) {
        try {
            const { email, password, username, phoneNumber, address } = req.body
            const { data } = await axios.post(USER_SERVER_URL + '/users/register', {
                email, password, username, phoneNumber, address
            })
            res.status(201).json(data)
        } catch (err) {
            next(err?.response?.data)
        }
    }

    static async deleteUser(req, res, next) {
        try {
            const { _id } = req.params
            const { data } = await axios.delete(USER_SERVER_URL + `/users/${_id}`)
            res.status(200).json(data)
        } catch (err) {
            next(err?.response?.data)
        }
    }

    static async fetchMovies(req, res, next) {
        try {
            const moviesCache = await redis.get('movies:all')
            if (moviesCache) {
                return res.status(200).json(JSON.parse(moviesCache))
            }

            const { data } = await axios.get(APP_SERVER_URL + '/movies')

            redis.set('movies:all', JSON.stringify(data))

            res.status(200).json(data)
        } catch (err) {
            next(err?.response?.data)
        }
    }

    static async fetchMovieById(req, res, next) {
        try {
            const { id } = req.params
            const movieCache = await redis.get(`movies:${id}`)
            if (movieCache) {
                return res.status(200).json(JSON.parse(movieCache))
            }

            const { data } = await axios.get(APP_SERVER_URL + `/movies/${id}`)

            redis.set(`movies:${id}`, JSON.stringify(data))

            res.status(200).json(data)
        } catch (err) {
            next(err?.response?.data)
        }
    }

    static async createMovie(req, res, next) {
        try {
            const { title, synopsis, trailerUrl, imgUrl, rating, genreId, authorId, casts } = req.body
            const { data } = await axios.post(APP_SERVER_URL + '/movies', {
                title, synopsis, trailerUrl, imgUrl, rating, genreId, authorId, casts
            })

            const keys = await redis.keys('movies:*')
            await redis.del(keys)

            res.status(201).json(data)
        } catch (err) {
            next(err?.response?.data)
        }
    }

    static async updateMovie(req, res, next) {
        try {
            const { id } = req.params
            const { title, synopsis, trailerUrl, imgUrl, rating, genreId, authorId, casts } = req.body
            const { data } = await axios.put(APP_SERVER_URL + `/movies/${id}`, {
                title, synopsis, trailerUrl, imgUrl, rating, genreId, authorId, casts
            })

            const keys = await redis.keys('movies:*')
            await redis.del(keys)

            res.status(200).json(data)
        } catch (err) {
            next(err?.response?.data)
        }
    }

    static async deleteMovie(req, res, next) {
        try {
            const { id } = req.params
            const { data } = await axios.delete(APP_SERVER_URL + `/movies/${id}`)

            const keys = await redis.keys('movies:*')
            await redis.del(keys)

            res.status(200).json(data)
        } catch (err) {
            next(err?.response?.data)
        }
    }
}

module.exports = Controller
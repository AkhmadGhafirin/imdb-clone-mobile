'use strict'

const { Movie, User, Cast, Genre, sequelize } = require('../models')

class MovieController {
    static async fetchMovies(req, res, next) {
        try {
            const movies = await Movie.findAll({
                include: [
                    {
                        model: User,
                        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
                    },
                    {
                        model: Genre,
                        attributes: { exclude: ['createdAt', 'updatedAt'] }
                    },
                    {
                        model: Cast,
                        attributes: { exclude: ['createdAt', 'updatedAt'] }
                    },
                ]
            })
            res.status(200).json(movies)
        } catch (err) {
            next(err)
        }
    }

    static async fetchMovieBySlug(req, res, next) {
        try {
            const { slug } = req.params
            const movie = await Movie.findOne({
                where: { slug },
                include: [
                    {
                        model: Genre,
                        attributes: { exclude: ['createdAt', 'updatedAt'] }
                    },
                    {
                        model: Cast,
                        attributes: { exclude: ['createdAt', 'updatedAt'] }
                    },
                ]
            })
            res.status(200).json(movie)
        } catch (err) {
            next(err)
        }
    }

    static async fetchMovieById(req, res, next) {
        try {
            const { id } = req.params
            const movie = await Movie.findOne({
                where: { id },
                include: [
                    {
                        model: Genre,
                        attributes: { exclude: ['createdAt', 'updatedAt'] }
                    },
                    {
                        model: Cast,
                        attributes: { exclude: ['createdAt', 'updatedAt'] }
                    },
                ]
            })
            res.status(200).json(movie)
        } catch (err) {
            next(err)
        }
    }

    static async createMovie(req, res, next) {
        const t = await sequelize.transaction()
        try {
            const { title, synopsis, trailerUrl, imgUrl, rating, genreId, casts } = req.body
            const { id: authorId } = req.userData
            const createdMovie = await Movie.create({
                title, synopsis, trailerUrl, imgUrl, rating, genreId, authorId
            }, { transaction: t })

            const insertCasts = casts.map(el => {
                delete el.id
                el.movieId = createdMovie.id
                return el
            })

            await Cast.bulkCreate(insertCasts, {
                transaction: t
            })

            await t.commit()

            res.status(201).json({
                message: 'Successfully create movie'
            })
        } catch (err) {
            await t.rollback()
            next(err)
        }
    }

    static async updateMovie(req, res, next) {
        const t = await sequelize.transaction()
        try {
            const { id } = req.params
            const { title, synopsis, trailerUrl, imgUrl, rating, genreId, casts } = req.body
            const { id: authorId } = req.userData

            const findMovie = await Movie.findOne({ where: { id } }, { transaction: t })
            if (!findMovie) throw { name: 'NotFound' }

            await Movie.update(
                { title, synopsis, trailerUrl, imgUrl, rating, genreId, authorId },
                { where: { id } },
                { transaction: t }
            )

            await Cast.destroy({ where: { movieId: id } }, { transaction: t })

            const insertCasts = casts.map(el => {
                delete el.id
                el.movieId = id
                return el
            })

            await Cast.bulkCreate(insertCasts, {
                transaction: t
            })

            await t.commit()

            res.status(200).json({
                message: 'Successfully update movie'
            })
        } catch (err) {
            await t.rollback()
            next(err)
        }
    }

    static async deleteMovie(req, res, next) {
        const t = await sequelize.transaction()
        try {
            const { id } = req.params

            const findMovie = await Movie.findOne({ where: { id } }, { transaction: t })
            if (!findMovie) throw { name: 'NotFound' }

            await Movie.destroy({ where: { id } }, { transaction: t })

            await t.commit()

            res.status(200).json({
                message: 'Successfully delete movie'
            })
        } catch (err) {
            await t.rollback()
            next(err)
        }
    }
}

module.exports = MovieController
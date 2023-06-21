'use strict'

const { Genre, Movie, Cast, sequelize } = require('../models')

class GenreController {
    static async fetchGenres(req, res, next) {
        try {
            const genres = await Genre.findAll({})
            res.status(200).json(genres)
        } catch (err) {
            next(err)
        }
    }

    static async fetchGenreById(req, res, next) {
        try {
            const { id } = req.params
            const genre = await Genre.findOne({ where: { id } })
            res.status(200).json(genre)
        } catch (err) {
            next(err)
        }
    }

    static async createGenre(req, res, next) {
        try {
            const { name } = req.body
            const createdGenre = await Genre.create({ name })

            res.status(201).json(createdGenre)
        } catch (err) {
            next(err)
        }
    }

    static async updateGenre(req, res, next) {
        try {
            const { id } = req.params
            const { name } = req.body
            const updatedGenre = await Genre.update(
                { name },
                { where: { id } }
            )

            if (!updatedGenre) throw { name: 'Failed' }

            res.status(200).json({
                message: 'Successfully update genre'
            })
        } catch (err) {
            next(err)
        }
    }

    static async deleteGenre(req, res, next) {
        const t = await sequelize.transaction()
        try {
            const { id } = req.params
            const findGenre = await Genre.findOne({ where: { id } }, { transaction: t })

            if (!findGenre) throw { name: 'NotFound' }

            await Genre.destroy({ where: { id } }, { transaction: t })

            await t.commit()

            res.status(200).json({
                message: 'Successfully delete genre'
            })
        } catch (err) {
            await t.rollback()
            next(err)
        }
    }
}

module.exports = GenreController
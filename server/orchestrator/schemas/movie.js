const APP_HOST = process.env.APP_SERVICE_URL || 'http://localhost:3001'
const USER_HOST = process.env.USER_SERVICE_URL || 'http://localhost:3002'
const axios = require('axios')
const redis = require('../config/redis')

const typeDefs = `#graphql
    type Cast {
        id: ID!
        name: String
        profilePict: String
        movieId: Int
    }

    type Genre {
        id: ID!
        name: String
    }

    type Movie {
        id: ID!
        title: String
        slug: String
        synopsis: String
        trailerUrl: String
        imgUrl: String
        rating: Int
        genreId: Int
        authorId: String
        createdAt: String
        updatedAt: String
        Genre: Genre
        Casts: [Cast]
        Author: User
    }

    type MovieMutationResult {
        statusCode: Int
        message: String
    }

    type Query {
        movies: [Movie]
        movie(id: Int!): Movie
    }

    type Mutation {
        createMovie(title: String!, synopsis: String!, trailerUrl: String!, imgUrl: String!, rating: Int!, genreId: Int!, authorId: String!, casts: [CastInput]!): MovieMutationResult
        updateMovie(id: Int!, title: String!, synopsis: String!, trailerUrl: String!, imgUrl: String!, rating: Int!, genreId: Int!, authorId: String!, casts: [CastInput]!): MovieMutationResult
        deleteMovie(id: Int!): MovieMutationResult
    }

    input CastInput {
        name: String
        profilePict: String
    }
`

const resolvers = {
    Query: {
        movies: async () => {
            const moviesCache = await redis.get('movies:all')
            if (moviesCache && moviesCache.length > 0) return JSON.parse(moviesCache)

            const { data } = await axios.get(APP_HOST + '/movies')
            const { data: users } = await axios.get(USER_HOST + '/users')
            const result = data.map(movie => {
                movie.Author = users.find(user => user?._id == movie?.authorId)
                return movie
            })

            redis.set('movies:all', JSON.stringify(result))

            return result
        },
        movie: async (_, { id }) => {
            const movieCache = await redis.get(`movies:${id}`)
            if (movieCache) return JSON.parse(movieCache)

            const { data } = await axios.get(APP_HOST + '/movies/' + id)
            const { data: user } = await axios.get(USER_HOST + '/users/' + data?.authorId)
            const result = {
                ...data,
                Author: user
            }

            redis.set(`movies:${id}`, JSON.stringify(result))

            return result
        }
    },
    Mutation: {
        createMovie: async (_, { title, synopsis, trailerUrl, imgUrl, rating, genreId, authorId, casts }) => {
            const { data } = await axios.post(APP_HOST + '/movies', {
                title, synopsis, trailerUrl, imgUrl, rating, genreId, authorId, casts
            })

            const keys = await redis.keys('movies:*')
            await redis.del(keys)

            return data
        },
        updateMovie: async (_, { id, title, synopsis, trailerUrl, imgUrl, rating, genreId, authorId, casts }) => {
            const { data } = await axios.put(APP_HOST + '/movies/' + id, {
                title, synopsis, trailerUrl, imgUrl, rating, genreId, authorId, casts
            })

            const keys = await redis.keys('movies:*')
            await redis.del(keys)

            return data
        },
        deleteMovie: async (_, { id }) => {
            const { data } = await axios.delete(APP_HOST + '/movies/' + id)
            
            const keys = await redis.keys('movies:*')
            await redis.del(keys)

            return data
        }
    }
}

module.exports = { typeDefs, resolvers }
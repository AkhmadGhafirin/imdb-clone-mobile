const HOST = process.env.USER_SERVICE_URL || 'http://localhost:3002'
const axios = require('axios')
const redis = require('../config/redis')

const typeDefs = `#graphql
    type User {
      _id: ID!
      email: String
      username: String
      role: String
      phoneNumber: String
      address: String
    }
 
    type UserLogin {
      _id: ID!
      email: String
      username: String
      role: String
      access_token: String
    }

    type UserMutationResult {
        statusCode: Int
        message: String
    }

    type Query {
        users: [User]
        user(_id: String!): User
        login(email: String!, password: String!): UserLogin
    }

    type Mutation {
        register(email: String!, password: String!, username: String, phoneNumber: String, address: String): UserMutationResult
        deleteUser(_id: String!): UserMutationResult
    }
`

const resolvers = {
    Query: {
        users: async () => {
            const usersCache = await redis.get('users:all')
            if (usersCache) return JSON.parse(usersCache)

            const { data } = await axios.get(HOST + '/users')

            redis.set('users:all', JSON.stringify(data))

            return data
        },
        user: async (_, { _id }) => {
            const userCache = await redis.get(`users:${_id}`)
            if (userCache) return JSON.parse(userCache)
            const { data } = await axios.get(HOST + '/users/' + _id)
            redis.set(`users:${_id}`, JSON.stringify(data))
            return data
        },
        login: async (_, { email, password }) => {
            const { data } = await axios.post(HOST + '/users/login', {
                email, password
            })
            return data
        }
    },
    Mutation: {
        register: async (_, { email, password, username, phoneNumber, address }) => {
            const { data } = await axios.post(HOST + '/users/register', {
                email, password, username, phoneNumber, address
            })
            return data
        },
        deleteUser: async (_, { _id }) => {
            const { data } = await axios.delete(HOST + '/users/' + _id)
            const keys = await redis.keys('users:*')
            await redis.del(keys)
            return data
        }
    }
}

module.exports = { typeDefs, resolvers }
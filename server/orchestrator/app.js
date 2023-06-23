const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')

const {
    typeDefs: userTypeDefs,
    resolvers: userResolvers
} = require('./schemas/user');

const {
    typeDefs: movieTypeDefs,
    resolvers: movieResolvers
} = require('./schemas/movie');

(async () => {
    const server = new ApolloServer({
        typeDefs: [userTypeDefs, movieTypeDefs],
        resolvers: [userResolvers, movieResolvers],
        introspection: true
    })

    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 }
    })

    console.log(`🚀  Server ready at: ${url}`)
})()
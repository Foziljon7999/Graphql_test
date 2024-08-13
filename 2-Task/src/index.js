const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone")

const { typeDefs, resolvers } = require("./modules")


const server = new ApolloServer({
    typeDefs,
    resolvers
})

const startServer = async () => {
    let { url } = await startStandaloneServer(server, 
        {listen: 9000})
        console.log(url);
}

startServer()
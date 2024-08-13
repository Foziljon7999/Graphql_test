const fetchData = require("../../config/postgres");

const resolvers = {
    Query: {
        users: () => fetchData("Select * from users")
    },
    
    Mutation: {
        createUser: async (_, args) => {
            let { name } = args.input
            await fetchData("INSERT INTO users(name) VALUES($1)", name)

            let users = fetchData("Select * from users")
            return users
        },
         updateUser: async (_, args) => {
            let { id, name } = args.input
            await fetchData("UPDATE users SET name = $1 WHERE id = $2", name, id)

            let users = fetchData("Select * from users")
            return users
         },
         
         deleteUser: async(_, args) => {
            let { id } = args.input
            await fetchData("DELETE FROM users WHERE id = $1", id)

            let users = fetchData("Select * from users")
            return users
         }
    }
}

module.exports = resolvers
const { readFileSync } = require("fs")
const path = require("path")

//typeDefs
let usersTypeDefs = readFileSync(path.join(process.cwd(), "src", "modules", "users", "schema.gql"), "utf-8")
let postsTypeDefs = readFileSync(path.join(process.cwd(), "src", "modules", "posts", "schema.gql"), "utf-8")
let commentsTypeDefs = readFileSync(path.join(process.cwd(), "src", "modules", "comments", "schema.gql"), "utf-8")

let typeDefs = [ usersTypeDefs, postsTypeDefs, commentsTypeDefs]

//resolvers
let usersResolvers = require("./users/resolvers")
let postsResolvers = require("./posts/resolvers")
let commentsResolvers = require("./comments/resolvers")

let resolvers = [usersResolvers, postsResolvers, commentsResolvers]

module.exports = {
    typeDefs,
    resolvers
}
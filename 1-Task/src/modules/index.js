const { readFileSync } = require("fs")
const path = require("path")

//typeDefs
let categoriesTypeDefs = readFileSync(path.join(process.cwd(), "src", "modules", "categories", "schema.gql"), "utf-8")
let mealsTypeDefs = readFileSync(path.join(process.cwd(), "src", "modules", "meals", "schema.gql"), "utf-8")

let typeDefs = [categoriesTypeDefs, mealsTypeDefs]

//resolvers
let categoryResolvers = require("./categories/resolvers")
let mealResolvers = require("./meals/resolvers")

let resolvers = [categoryResolvers, mealResolvers]

module.exports = {
    typeDefs,
    resolvers
}
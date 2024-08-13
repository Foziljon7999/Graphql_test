const fetchData = require("../../config/postgres");

const resolvers = {
  Query: {
    categories: () => fetchData("SELECT * FROM categories"),
  },
  Mutation: {
    createCategory: async (_, args) => {
      let { name } = args.input;

      await fetchData("Insert into categories(name) Values($1)", name);

      let categories = fetchData("Select * from categories");
      return categories;
    },

    updateCategory: async (_, args) => {
      let { id, name } = args.input;

      await fetchData(
        "UPDATE categories SET name = $1 WHERE id = $2",
        name,
        id
      );

      let categories = await fetchData("Select * from categories");
      return categories;
    },

    deleteCategory: async (_, args) => {
      let { id } = args.input;

      await fetchData("DELETE FROM categories WHERE id = $1", id);

      let categories = await fetchData("SELECT * FROM categories");
      return categories;
    },
  },
};

module.exports = resolvers;

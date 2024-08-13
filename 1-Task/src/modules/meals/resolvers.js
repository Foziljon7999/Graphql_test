const fetchData = require("../../config/postgres");

const resolvers = {
  Query: {
    meals: () => fetchData("Select * from meals"),
  },

  Meal: {
    category: async (parent) => {
      let [categories] = await fetchData(
        "Select * from categories WHERE id = $1",
        parent.category_id
      );
      return categories;
    },
  },

  Mutation: {
    createMeal: async (_, args) => {
      let { name, price, quantity, category_id } = args.input;

      await fetchData(
        "Insert into meals(name, price, quantity, category_id) Values($1, $2, $3, $4)",
        name,
        price,
        quantity,
        category_id
      );

      let meals = fetchData("Select * from meals");
      return meals;
    },

    updateMeal: async (_, args) => {
      let { id, name, price, quantity, category_id } = args.input;

      await fetchData(
        "UPDATE meals SET name = $1, price = $2, quantity = $3, category_id = $4 WHERE id = $5",
        name,
        price,
        quantity,
        category_id,
        id
      );

      let meals = await fetchData("Select * from meals");
      return meals;
    },

    deleteMeal: async (_, args) => {
      let { id } = args.input;

      await fetchData("DELETE FROM meals WHERE id = $1", id);

      let meals = await fetchData("SELECT * FROM meals");
      return meals;
    },
  },
};

module.exports = resolvers;

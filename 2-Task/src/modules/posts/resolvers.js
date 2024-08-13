const fetchData = require("../../config/postgres");

const resolvers = {
  Query: {
    posts: () => fetchData("SELECT * FROM posts"),
  },

  Post: {
    user: async (parent) => {
      let [user] = await fetchData(
        "SELECT * FROM users WHERE id = $1",
        parent.user_id
      );
      return user;
    },
  },

  Mutation: {
    createPost: async (_, args) => {
      let { title, content, user_id } = args.input;
      await fetchData(
        "INSERT INTO posts(title, content, user_id) VALUES($1, $2, $3)",
        title,
        content,
        user_id
      );

      let posts = fetchData("SELECT * FROM posts");
      return posts;
    },
    updatePost: async (_, args) => {
      let { id, title, content, user_id } = args.input;
      await fetchData(
        "UPDATE posts SET title = $1, content = $2, user_id = $3 WHERE id = $4",
        title,
        content,
        user_id,
        id
      );

      let posts = fetchData("SELECT * FROM posts");
      return posts;
    },
    deletePost: async (_, args) => {
      let { id } = args.input;

      await fetchData("DELETE FROM posts WHERE id = $1", id);

      let posts = fetchData("SELECT * FROM posts");
      return posts;
    },
  },
};

module.exports = resolvers;

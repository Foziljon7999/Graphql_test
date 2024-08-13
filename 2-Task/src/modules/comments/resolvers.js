const fetchData = require("../../config/postgres");

const resolvers = {
    Query: {
        comments: () => fetchData("SELECT * FROM comments")
    },
    Comment: {
        post: async (parent) => {
          let [post] = await fetchData(
            "SELECT * FROM users WHERE id = $1",
            parent.post_id
          );
          return post;
        },
      },

      Comment: {
        user: async (parent) => {
          let [user] = await fetchData(
            "SELECT * FROM users WHERE id = $1",
            parent.user_id
          );
          return user;
        },
      },

      Mutation: {
        createComment: async (_, args) => {
            let { text, user_id, post_id } = args.input
            await fetchData("INSERT INTO comments(text, user_id, post_id) VALUES($1, $2, $3)", text, user_id, post_id)

            let comments = fetchData("SELECT * FROM comments")
            return comments
        },

        updateComment: async(_, args) => {
            let { id, text, user_id, post_id } = args.input
            await fetchData("UPDATE comments SET text = $1, user_id = $2, post_id = $3 WHERE id = $4", text, user_id, post_id, id)

            let comments = fetchData("SELECT * FROM comments")
            return comments
        },

        deleteComment: async(_, args) => {
            let {id} = args.input
            await fetchData("DELETE FROM comments WHERE id = $1", id)

            let comments = fetchData("SELECT * FROM comments")
            return comments
        }
      }
}

module.exports = resolvers
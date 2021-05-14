const { ApolloError } = require("apollo-server-errors");
const Post = require("../../models/post");
module.exports = {
  Query: {
    getAllPosts: async (_, {}, { req }) => {
      if (["admin"].includes(req.user.role)) {
        const posts = await Post.find();
        const result = posts.map((val) => {
          return val.populate("author").execPopulate();
        });
        return result;
      } else {
        throw new ApolloError("you don't have permiision to acess this route");
      }
    },
    getPostByID: async (_, { id }) => {
      const post = await Post.findById(id);
      return post;
    },
  },
  Mutation: {
    createNewPost: async (_, { newPost }, { req }) => {
      const post = new Post({ ...newPost, author: req.user._id });
      const rs = await post.save();
      const result = await rs.populate("author").execPopulate();
      return result;
    },
    editPostByID: async (_, { id, updatedPost }, { req }) => {
      try {
        const editPost = await Post.findOneAndUpdate(
          { _id: id, author: req.user._id.toString() },
          { ...updatedPost },
          { new: true }
        );
        if (!editPost) {
          throw new Error("Unable to edit the post.");
        }
        return editPost;
      } catch (err) {
        throw new ApolloError(err.message, 400);
      }
    },
    deletePostByID: async (_, { id }, { req }) => {
      try {
        const deletePost = await Post.findOneAndDelete({
          _id: id,
          author: req.user._id.toString(),
        });
        if (!deletePost) {
          throw new Error("Unable to delete the post.");
        }
        return {
          success: true,
          id: deletePost.id,
          message: "Your Post is deleted",
        };
      } catch (err) {
        throw new ApolloError(err.message);
      }
    },
  },
};

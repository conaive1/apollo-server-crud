const { gql } = require("apollo-server-express");
module.exports = gql`
  extend type Query {
    getAllPosts: [Post!]! @isAuth
    getPostByID(id: ID!): Post!
  }
  extend type Mutation {
    createNewPost(newPost: PostInput!): Post! @isAuth
    editPostByID(updatedPost: PostInput!, id: ID!): Post! @isAuth
    deletePostByID(id: ID!): PostNotification! @isAuth
  }
  input PostInput {
    title: String!
    content: String!
    featuredImage: String
  }
  type Post {
    id: ID!
    title: String!
    content: String!
    updatedAt: String
    createdAt: String
    featuredImage: String
    author: User!
  }
  type PostNotification {
    id: ID!
    message: String!
    success: Boolean!
  }
`;

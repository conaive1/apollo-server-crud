const { gql } = require("apollo-server-express");
module.exports = gql`
  extend type Subscription {
    RegisterUser: AuthResp!
  }
  extend type Query {
    authUser: User!
    loginUser(email: String!, password: String): AuthResp!
  }
  extend type Mutation {
    RegisterUser(newUser: UserInput!): AuthResp!
  }
  input UserInput {
    name: String!
    email: String!
    password: String!
  }
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    role: String
    isActive: Boolean
  }
  type AuthResp {
    user: User!
    token: String!
  }
`;

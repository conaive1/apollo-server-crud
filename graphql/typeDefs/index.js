const { gql } = require("apollo-server-express");
const baseDefs = require("./baseDefs");
const post = require("./post");
const user = require("./user");
module.exports = [baseDefs, post, user];

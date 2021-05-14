const express = require("express");
const consola = require("consola");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { ApolloServer, gql } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./graphql/index");
const { AuthMiddlewares } = require("./middlewares/auth");
const { schemaDirectives } = require("./directives/index");
dotenv.config();
app.use(AuthMiddlewares);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives,
  context: ({ req }) => {
    const { isAuth, user } = req;
    return {
      req,
      user,
      isAuth,
    };
  },
});
const startApp = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    consola.success({ message: "ket noi db thanh cong", badge: true });
    server.applyMiddleware({ app });
    app.listen(process.env.PORT, () =>
      consola.success({
        message: `Server dang chay port ${process.env.PORT} `,
        badge: true,
      })
    );
  } catch (err) {
    consola.error({ message: err.message, badge: true });
  }
};
startApp();

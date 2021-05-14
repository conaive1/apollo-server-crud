const { defaultFieldResolver } = require("graphql");
const {
  ApolloError,
  SchemaDirectiveVisitor,
} = require("apollo-server-express");
class IsAuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(filed) {
    const { resolve = defaultFieldResolver } = filed;
    filed.resolve = async function (...args) {
      const [_, {}, { user, isAuth }] = args;
      if (isAuth) {
        const rs = await resolve.apply(this, args);
        return rs;
      } else {
        throw new ApolloError(
          "YOU must be authenticated user to get this information"
        );
      }
    };
  }
}
exports.IsAuthDirective = IsAuthDirective;

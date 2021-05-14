const { IsAuthDirective } = require("./auth.directive");
const schemaDirectives = {
  isAuth: IsAuthDirective,
};
exports.schemaDirectives = schemaDirectives;

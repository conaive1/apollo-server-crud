const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { pick } = require("lodash");
dotenv.config();
const issueToken = async (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      isActive: user.isActive,
    },
    process.env.SECRET
  );
  return `Bearer ${token}`;
};
const serializeUser = (user) => {
  return pick(user, ["id", "name", "email", "role", "isActive"]);
};
exports.issueToken = issueToken;
exports.serializeUser = serializeUser;

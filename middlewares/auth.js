const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");
dotenv.config();
const AuthMiddlewares = async (req, res, next) => {
  const authHeaders = req.get("Authorization");
  if (!authHeaders) {
    req.isAuth = false;
    return next();
  }
  const token = authHeaders.split(" ")[1];
  if (!token || token == "") {
    req.isAuth = false;
    return next();
  }
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decodedToken.id);
    if (!user) {
      req.isAuth = false;
      return next();
    }
    req.user = user;
    req.isAuth = true;
  } catch (err) {
    req.isAuth = false;
    return next();
  }
  return next();
};
exports.AuthMiddlewares = AuthMiddlewares;

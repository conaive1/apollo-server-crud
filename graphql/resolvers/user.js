const { ApolloError } = require("apollo-server-errors");
const { PubSub } = require("apollo-server");
const User = require("../../models/User");
const { issueToken, serializeUser } = require("../../Functions/UserFunction");
const pubsub = new PubSub();
const NEW_USER = "NEW_USER";
module.exports = {
  Subscription: {
    RegisterUser: {
      Subscribe: () => pubsub.asyncIterator([NEW_USER]),
    },
  },
  Query: {
    loginUser: async (_, { email, password }) => {
      try {
        let user = await User.findOne({ email });
        if (!email) {
          throw new Error("email not found");
        }
        const isMatchPassword = await User.comparePassword(
          password,
          user.password
        );
        if (!isMatchPassword) {
          throw new Error("password is incore");
        }
        user = user.toObject();
        user.id = user._id;
        user = serializeUser(user);
        const token = issueToken(user);
        return {
          token,
          user,
        };
      } catch (err) {
        throw new ApolloError(err.message, 403);
      }
    },
  },
  Mutation: {
    RegisterUser: async (_, { newUser }) => {
      try {
        const { name, email, password } = newUser;
        const user = await User.findOne({ email });
        if (user) {
          throw new Error("email is already");
        }
        const New_user = new User({ name, email, password });
        let saveUser = await New_user.save();
        pubsub.publish(NEW_USER, { saveUser });
        saveUser = saveUser.toObject();
        saveUser.id = saveUser._id;
        saveUser = serializeUser(saveUser);
        const token = issueToken(saveUser);
        return {
          token,
          user: saveUser,
        };
      } catch (err) {
        throw new ApolloError(err.message, 400);
      }
    },
  },
};

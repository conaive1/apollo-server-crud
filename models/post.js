const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.set("runValidators", true);
const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    content: {
      type: String,
      required: [true, "content is required"],
    },
    featuredImage: {
      type: String,
      require: false,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Post", PostSchema, "Post");

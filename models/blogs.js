// models/blog.js

const mongoose = require("mongoose");

// Define the schema
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  images: [
    {
      type: String,
    },
  ],
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  // author: {
  //   // type: mongoose.Schema.Types.ObjectId,
  //   type: String,
  //   // ref: "User",
  //   required: true,
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the model
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;

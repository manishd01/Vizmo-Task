const Blog = require("../models/blogs");

const createBlog = async (req, res) => {
  const { title, images, content, author } = req.body;

  const blog = new Blog({
    title,
    images,
    content,
    author,
  });

  try {
    await blog.save();
    console.log("Saving...");
    res.status(201).send(blog);
  } catch (error) {
    console.log("Error:", error);
    res.status(400).send(error);
  }
};

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.send(blogs);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateBlog = async (req, res) => {
  const { title } = req.params;
  const { images, content } = req.body;

  try {
    const blog = await Blog.findOneAndUpdate(
      { title },
      { $set: { images, content } },
      { new: true }
    );
    res.send(blog);
  } catch (error) {
    res.status(500).send(error);
  }
};

const patchBlog = async (req, res) => {
  const { title } = req.params;
  const { content } = req.body;

  try {
    const blog = await Blog.findOneAndUpdate(
      { title },
      { $set: { content } },
      { new: true }
    );
    res.send(blog);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteBlog = async (req, res) => {
  const { title } = req.params;

  try {
    await Blog.findOneAndDelete({ title });
    res.send("Blog deleted successfully");
  } catch (error) {
    res.status(500).send(error);
  }
};

const getBlogByTitle = async (req, res) => {
  const { title } = req.params;

  try {
    const blog = await Blog.findOne({ title });
    if (!blog) {
      return res.status(404).send("Blog not found");
    }
    res.send(blog);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createBlog,
  getBlogs,
  updateBlog,
  patchBlog,
  deleteBlog,
  getBlogByTitle,
};

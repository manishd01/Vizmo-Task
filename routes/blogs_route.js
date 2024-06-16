const express = require("express");
const auth = require("../middleWare/auth_middle");

const {
  createBlog,
  getBlogs,
  updateBlog,
  patchBlog,
  deleteBlog,
  getBlogByTitle,
} = require("../controller/blog_controller");

const router = express.Router();

router.post("/blogs", auth, createBlog);
router.get("/blogs", getBlogs);
router.put("/blogs/:title", auth, updateBlog);
router.patch("/blogs/:title", auth, patchBlog);
router.delete("/blogs/:title", auth, deleteBlog);
router.get("/blogs/:title", getBlogByTitle);

module.exports = router;

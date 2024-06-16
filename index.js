const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./models/blogs");
const blogRoutes = require("./routes/blogs_route");
const authRoutes = require("./routes/auth_route");

require("dotenv").config();

const app = express();
const port = 3000;

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB Atlas", err);
  });

app.use(express.json());

app.use("/auth", authRoutes);

app.use(blogRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

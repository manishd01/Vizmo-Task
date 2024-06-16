const express = require("express");
const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleWare/auth_middle");
const router = express.Router();
require("dotenv").config();
// Registration
const { body, validationResult } = require("express-validator");

router.post(
  "/register",
  [
    // Validation checks
    body("name").notEmpty().withMessage("Name is required"),
    body("username").notEmpty().withMessage("Username is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")
      .matches(/\d/)
      .withMessage("Password must contain a number")
      .matches(/[a-z]/)
      .withMessage("Password must contain a lowercase letter")
      .matches(/[A-Z]/)
      .withMessage("Password must contain an uppercase letter")
      .matches(/[^a-zA-Z0-9]/)
      .withMessage("Password must contain a special character"),
  ],

  async (req, res) => {
    const errors = validationResult(req);

    // Check for validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, username, password } = req.body;

    try {
      // Check if username already exists
      let user = await User.findOne({ username });
      if (user) {
        return res.status(400).send("Username already exists");
      }
      //hashing done in user.model
      // Create and save the user
      user = new User({ name, username, password: password });
      await user.save();

      res.status(201).send("User registered successfully");
    } catch (error) {
      res.status(500).send("Server error");
    }
  }
);
// Login
router.post(
  "/login",
  [
    // Validation checks
    body("username").notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // Check for validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      // Check if the user exists
      const user = await User.findOne({ username });
      if (!user) {
        // Use a generic message for security reasons
        return res.status(400).send("Invalid credentials");
      }

      // Check if the password is correct
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        // Use a generic message for security reasons
        return res.status(400).send("Invalid credentials");
      }

      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "10m",
      });

      console.log("User logged in:", username);
      res.json({ token });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).send("Login failed");
    }
  }
);

// Middleware to check if user is logged in
router.get("/check-login", auth, (req, res) => {
  res.status(200).send("User is logged in");
});

// Route for logging out
router.post("/logout", auth, (req, res) => {
  // Perform any logout logic, such as clearing session or JWT token
  res.status(200).send("Logged out successfully");
});

module.exports = router;

const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = (req, res, next) => {
  const authHeader = req.get("Authorization");

  // Check if the Authorization header is provided
  if (!authHeader) {
    return res.status(401).send("Access denied. No token provided.");
  }

  // Check if the token format is correct
  const token = authHeader.split("Bearer ")[1];
  if (!token) {
    return res.status(401).send("Access denied. Invalid token format.");
  }

  try {
    console.log("Entering token verification:", token);

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token verification successful:", decoded);

    // Attach the decoded token to the request object
    req.user = decoded;

    // Call the next middleware
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(400).send("Invalid token.");
  }
};

module.exports = auth;

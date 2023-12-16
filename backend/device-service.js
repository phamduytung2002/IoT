// device-service.js
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3001;
const secretKey = "yourSecretKey"; // Change this to a secure secret key

mongoose.connect("mongodb://localhost/deviceDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ... (previous code)

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ error: "Forbidden" });
    req.user = user;
    next();
  });
};

// Apply authentication middleware to all routes except login
app.use("/devices", authenticateToken);

app.post("/login", (req, res) => {
  // Implement user authentication logic and generate a JWT token
  const username = req.body.username;
  const password = req.body.password;

  // Example: Check username and password (replace with your authentication logic)
  if (username === "admin" && password === "password") {
    const token = jwt.sign({ username }, secretKey);
    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

// ... (remaining code)

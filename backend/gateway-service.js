// gateway-service.js
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Middleware to attach JWT token to requests
const attachToken = async (req, res, next) => {
  try {
    const loginResponse = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: 'password' }), // Hardcoded for simplicity
    });

    const { token } = await loginResponse.json();
    req.headers['Authorization'] = token;
    next();
  } catch (error) {
    console.error('Error attaching token:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

app.use(attachToken);

app.get('/devices', async (req, res) => {
  // ... (previous code)
});

// ... (remaining code)

// server.js
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db'); // Import the database connection
const teamRoutes = require('./routes/teamRoutes');
const questionRoutes = require('./routes/questionRoutes');
require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/teams', teamRoutes);
app.use('/api/questions', questionRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
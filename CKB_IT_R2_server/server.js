// server.js
require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db'); // Import the database connection
const teamRoutes = require('./routes/teamRoutes');
const questionRoutes = require('./routes/questionRoutes');
const withJwt = require("./middleware/jwtMiddleware");
const adminRoute = require("./routes/adminRoutes");
const authRoute = require("./routes/authRoute");
const cookieParser = require("cookie-parser");

const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({
  origin: true,         // reflect request origin
  credentials: true    // allow cookies
}));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/teams', teamRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/auth',authRoute)
app.use('/api/admin',withJwt,adminRoute);


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
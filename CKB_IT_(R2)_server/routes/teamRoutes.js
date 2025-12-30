// routes/teamRoutes.js

const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

// Route to create a new team
router.post('/', teamController.createTeam);

// Route to get team information
router.get('/admin/scores', teamController.getTeams); // New route for getting team info

module.exports = router;
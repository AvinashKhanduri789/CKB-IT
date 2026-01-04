const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');


// Route to create a new team
router.post('/', teamController.createTeam);
 

module.exports = router;
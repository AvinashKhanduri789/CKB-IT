const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

// Route to get all questions
router.get('/', questionController.getQuestions);

// Route to submit an answer
router.post('/submit/:questionNumber', questionController.submitAnswer);

router.post('/status/:questionNumber', questionController.statusUpdate);

module.exports = router; 
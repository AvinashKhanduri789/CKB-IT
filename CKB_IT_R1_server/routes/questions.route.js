const express = require('express');
const router = express.Router();
const questionsController = require('../controllers/questions.controller');

router.get('/questions/fetch', questionsController.fetchQuestions);
router.post('/questions/update', questionsController.updateQuestions);

module.exports = router;
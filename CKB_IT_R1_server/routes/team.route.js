const express = require('express');
const router = express.Router();
const teamController = require('../controllers/team.controller');

router.post('/team/update', teamController.storeData);
router.get('/team/fetch', teamController.fetchData);

module.exports = router;
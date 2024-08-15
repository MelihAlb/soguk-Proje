const express = require('express');
const router = express.Router();
const { createTopic, getTopics } = require('../controllers/topicController');
const { tokenCheck } = require('../middlewares/auth');
const { topicValidation } = require("../middlewares/validation.js/topicValidation");

router.post('/topics', tokenCheck,topicValidation.create,createTopic);
router.get('/topics', getTopics);

module.exports = router;

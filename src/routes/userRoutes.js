const express = require('express');
const router = express.Router();

const { getUserContent,getUserTopics,getUserEntries } = require('../controllers/userController');

router.get("/user/:userId/content", getUserContent);
router.get("/user/:userId/topics", getUserTopics);
router.get("/user/:userId/entries", getUserEntries);

module.exports = router;
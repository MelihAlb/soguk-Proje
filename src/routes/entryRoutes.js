const express = require("express");
const router = express.Router();
const { createEntry,getAllEntries } = require('../controllers/entryController');
const { tokenCheck } = require('../middlewares/auth');
const {entryValidation} = require("../middlewares/validation.js/entryValidation");

router.post('/entries', tokenCheck,entryValidation.create, createEntry);
router.get('/entries', getAllEntries);

module.exports = router;
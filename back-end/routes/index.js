const express = require('express');
const notes = require('../components/notes/routes');

const router = express.Router();

router.use('/', notes);

module.exports = router;
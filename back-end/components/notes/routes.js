const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.get('/getNotes', controller.getNotes);
router.post('/createNewNote', controller.createNewNote);
router.post('/deleteNote', controller.deleteNote);
router.post('/updateNote', controller.updateNote);

module.exports = router;

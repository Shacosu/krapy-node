const express = require('express');
const router = express.Router();

const { createNote, editNote, deleteNote, getNotes, getNoteById } = require('../controllers/index.controller.js')

router.route('/create/note')
    .get(createNote)

router.route('/get/notes')
    .get(getNotes)

router.route('/get/note/:id')
    .get(getNoteById)

router.route('/edit/note')
    .post(editNote)

router.route('/delete/note')
    .post(deleteNote)

module.exports = router;
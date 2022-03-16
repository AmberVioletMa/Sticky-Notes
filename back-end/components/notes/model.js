const notesDao = require('./dao');

module.exports = {

    getNotes() {
        return notesDao.getNotes();
    },

    createNewNote(resources) {
        return notesDao.createNewNote(resources.body);
    },

    deleteNote(resources) {
        return notesDao.deleteNoteById(resources.body._id);
    },

    updateNote(resources) {
        return notesDao.updateNoteKeyById(resources.body._id, resources.body.key, resources.body.value);
    },
};
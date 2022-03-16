const notesSocketsDao = require('./socketsDao');

module.exports = {

    createNote(resources, newNote) {
        return notesSocketsDao.createNote({ _id: newNote.insertedId, ...resources.body });
    },

    deleteNote(resources) {
        return notesSocketsDao.deleteNote({ id: resources.body._id });
    },

    updateNote(resources, updatedNote) {
        return notesSocketsDao.updateNote(updatedNote);
    },
};
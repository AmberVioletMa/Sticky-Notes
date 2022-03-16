const mongodb = require('mongodb');
const socketController = require('../../services/sockets');

module.exports = {
    createNote: (body) => {
        const io = socketController.getSocket();
        io.to('Notes').emit('NotesCreate', body);
    },
    deleteNote: (body) => {
        const io = socketController.getSocket();
        io.to('Notes').emit('NotesDelete', body)
    },
    updateNote: (body) => {
        const io = socketController.getSocket();
        io.to('Notes').emit('NotesUpdates', body)
    },
}
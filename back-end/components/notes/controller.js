const notesModel = require('./model');
const socketController = require('./socketsModel');

module.exports = {
    async getNotes(request, response) {
        try {
            const result = await notesModel.getNotes();
            response.json(result);
        } catch (error) { next(error); }
    },
    async createNewNote(request, response) {
        try {
            const newNote = await notesModel.createNewNote(request);
            socketController.createNote(request, newNote);
            response.json(newNote);
        } catch (error) { next(error); }
    },
    async deleteNote(request, response) {
        try {
            const deleteStatus = await notesModel.deleteNote(request);
            socketController.deleteNote(request);
            response.status(200).json(deleteStatus);
        } catch (error) { next(error); }
    },
    async updateNote(request, response, next) {
        try {
            const updatedNote = await notesModel.updateNote(request);
            socketController.updateNote(request, updatedNote);
            response.json(updatedNote);
        } catch (error) { next(error); }
    },
}
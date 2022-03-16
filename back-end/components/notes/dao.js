const mongodb = require('mongodb');
const dbConnection = require('../../services/db');

module.exports = {
    async getNotes() {
        const db = dbConnection.getDb();
        const result = await db.collection('Notes').find({}).toArray();
        return result;
    },
    async createNewNote(body) {
        const db = dbConnection.getDb();
        const newNote = await db.collection('Notes').insertOne(body);
        return newNote;
    },
    async deleteNoteById(id) {
        const db = dbConnection.getDb();
        const deleteStatus = await db.collection('Notes').deleteOne({ '_id': new mongodb.ObjectId(id) });
        return deleteStatus;
    },
    async updateNoteKeyById(id, key, value) {
        const db = dbConnection.getDb();
        const updatedNote = await db.collection('Notes').findOneAndUpdate({ '_id': new mongodb.ObjectId(id) }, { $set: { [key]: value } }, { returnOriginal: false, "returnDocument": 'after' });
        return updatedNote;
    },
}
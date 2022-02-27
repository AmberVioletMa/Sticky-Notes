const mongodb = require('mongodb');
module.exports = {
    getNotes(request, response, MongoClient) {
        MongoClient.connect('mongodb://localhost', { useNewUrlParser: true }, function (err, client) {
            const db = client.db('StickyNotesAmberMacias');
            db.collection('Notes').find({}).toArray(function (findErr, result) {
                if (findErr) throw findErr;
                response.json(result);
                client.close();
            });
        });
    },
    createNewNote(request, response, MongoClient, io) {
        MongoClient.connect('mongodb://localhost', { useNewUrlParser: true }, async function (err, client) {
            const db = client.db('StickyNotesAmberMacias');
            const newNote = await db.collection('Notes').insertOne(request.body);
            io.to('Notes').emit('NotesCreate', { _id: newNote.insertedId, ...request.body });
            response.json(newNote);
            client.close();
        });
    },
    deleteNote(request, response, MongoClient, io) {
        MongoClient.connect('mongodb://localhost', { useNewUrlParser: true }, async function (err, client) {
            const db = client.db('StickyNotesAmberMacias');
            const deleteStatus = await db.collection('Notes').deleteOne({ '_id': new mongodb.ObjectId(request.body._id) });
            io.to('Notes').emit('NotesDelete', { id: request.body._id });
            response.status(200).json(deleteStatus);
            client.close();
        });
    },
    updateNote(request, response, MongoClient, io) {
        MongoClient.connect('mongodb://localhost', { useNewUrlParser: true }, async function (err, client) {
            const db = client.db('StickyNotesAmberMacias');
            const updatedNote = await db.collection('Notes').findOneAndUpdate({ '_id': new mongodb.ObjectId(request.body._id) }, { $set: { [request.body.key]: request.body.value } }, { returnOriginal: false, "returnDocument": 'after' });
            io.to('Notes').emit('NotesUpdates', updatedNote);
            response.json(updatedNote);
            client.close();
        });
    },
}
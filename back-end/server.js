
const express = require('express');
const app = express();
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const notesActions = require('./notesActions');

app.use(express.json());

const options = {};
const http = require('http');

const server = http.createServer(options, app).listen(3010, () => {
    console.log('server running at ' + 3010)
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, Content-Type, Accept, AuthorizationRefresh");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});


/******* SOCKETS *******/
global.io = require("socket.io")(server);

io.on('connection', (socket) => {
    console.log(`Connected: ${socket.id}`);

    socket.on('disconnect', () =>
       console.log(`Disconnected: ${socket.id}`));

    socket.on('join', (room) => {
       socket.join(room);
    });

    socket.on('NotesUpdates', (data) => {
       const { message, room } = data;
       io.to(room).emit('NotesUpdates', message);
    });
    
 });
// /******* SOCKETS *******/


const errorMessage = 'There was an error on the server';

app.get('/getNotes', (request, response) => {
    try {
        notesActions.getNotes(request, response, MongoClient);
    } catch (error) {response.status(500).json({ message: errorMessage });}
});

app.post('/createNewNote', (request, response) => {
    try {
        notesActions.createNewNote(request, response, MongoClient, io);
    } catch (error) {response.status(500).json({ message: errorMessage });}
});

app.post('/deleteNote', (request, response) => {
    try {
        notesActions.deleteNote(request, response, MongoClient, io);
    } catch (error) {response.status(500).json({ message: errorMessage });}
});

app.post('/updateNote', (request, response) => {
    try {
        notesActions.updateNote(request, response, MongoClient, io);
    } catch (error) {response.status(500).json({ message: errorMessage });}
});


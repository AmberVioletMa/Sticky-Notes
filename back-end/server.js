
const app = require('./app');
const http = require('http');
const dbConnection = require('./services/db');
const socketController = require('./services/sockets');
const config = require('config');

const options = {};

const server = http.createServer(options, app).listen(config.get('port'), () => {
    console.log('server running at ' + config.get('port'))
});

dbConnection.connectToServer();
socketController.initialiceSockets(server);

module.exports = server;


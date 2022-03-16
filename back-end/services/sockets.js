let io;
module.exports = {
    initialiceSockets: function (server) {
        io = require("socket.io")(server);
        io.on('connection', (socket) => {
            console.log(`Connected: ${socket.id}`);
            socket.on('disconnect', () => console.log(`Disconnected: ${socket.id}`));
            socket.on('join', (room) => socket.join(room));
        });
    },

    getSocket: () => io,
};
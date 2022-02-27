import io from 'socket.io-client';
let socket;

export const initiateSocket = (room) => {
  socket = io('http://localhost:3010/', { transports : ['websocket'] });
  if (socket) socket.emit('join', room);
}

export const disconnectSocket = () => {
  if(socket) socket.disconnect();
}

export const subscribeToNotesUpdates = (cb) => {
  if (!socket) return(true);
  socket.on('NotesUpdates', msg => {
    return cb(null, msg);
  });
}

export const subscribeToNotesCreate = (cb) => {
  if (!socket) return(true);
  socket.on('NotesCreate', msg => {
    return cb(null, msg);
  });
}

export const subscribeToNotesDelete = (cb) => {
  if (!socket) return(true);
  socket.on('NotesDelete', msg => {
    return cb(null, msg);
  });
}
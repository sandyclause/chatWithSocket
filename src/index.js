const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDiriectionPath = path.join(__dirname, '../public');

app.use(express.static(publicDiriectionPath));

let count = 0;

io.on('connection', (socket) => {
  console.log('new websocket connection');

  socket.emit('countUpdated', count);

  socket.on('increment', () => {
    count++;
    io.emit('countUpdated', count)
  })
})

server.listen(port, () => {
  console.log(`Service is up on port ${port}`);
})

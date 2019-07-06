const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const Filter = require('bad-words');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDiriectionPath = path.join(__dirname, '../public');

app.use(express.static(publicDiriectionPath));

io.on('connection', (socket) => {
  console.log('new websocket connection');

  const message = 'Welcome!'

  socket.emit('message', message);
  socket.broadcast.emit('message', 'a new user has joined');

  socket.on('sendMessage', (message, callback) => {
    const filter = new Filter();

    if (filter.isProfane(message)) {
      return callback('profanity is not allowed')
    }

    io.emit('message', message);
    callback();
  })

  socket.on('disconnect', () => {
    io.emit('message', 'a user has left')
  })

  socket.on('sendLocation', (location, callback) => {
    console.log(location)
    io.emit('message', `https://google.com/maps?q=${location.lat},${location.long}`)
    callback();
  })
})

server.listen(port, () => {
  console.log(`Service is up on port ${port}`);
})

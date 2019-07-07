const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const Filter = require('bad-words');
const { generateMessage, generateLocationMessage } = require('./utils/messages');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDiriectionPath = path.join(__dirname, '../public');

app.use(express.static(publicDiriectionPath));

io.on('connection', (socket) => {
  console.log('new websocket connection');


  socket.emit('message', generateMessage('Welcome'));
  socket.broadcast.emit('message', generateMessage('a new user has joined'));

  socket.on('sendMessage', (message, callback) => {
    const filter = new Filter();

    if (filter.isProfane(message)) {
      return callback('profanity is not allowed')
    }

    io.emit('message', generateMessage(message));
    callback();
  })

  socket.on('disconnect', () => {
    io.emit('message', generateMessage('a user has left'))
  })

  socket.on('sendLocation', (location, callback) => {
    console.log(location)
    io.emit('locationMessage', generateLocationMessage(`https://google.com/maps?q=${location.lat},${location.long}`))
    callback();
  })

})

server.listen(port, () => {
  console.log(`Service is up on port ${port}`);
})

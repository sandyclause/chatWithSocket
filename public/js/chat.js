const socket = io();

document.querySelector('#welcome').addEventListener('submit', (e) => {
  e.preventDefault();
  const message = e.target.elements.message.value;
  socket.emit('sendMessage', message)
})

socket.on('message', (message) => {
  console.log(message)
})
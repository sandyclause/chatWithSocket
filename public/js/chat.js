const socket = io();

document.querySelector('#welcome').addEventListener('submit', (e) => {
  e.preventDefault();
  const inputValue = document.querySelector('#input').value;
  socket.emit('sendMessage', inputValue)
})

socket.on('message', (message) => {
  console.log(message)
})
const socket = io();

document.querySelector('#welcome').addEventListener('submit', (e) => {
  e.preventDefault();
  const message = e.target.elements.message.value;
  socket.emit('sendMessage', message, (error) => {
    if (error) {
      return console.log(error)
    }
    console.log('messaged delivered')
  })
})

socket.on('message', (message) => {
  console.log(message)
})

document.querySelector('#sendLocation').addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('geolocation is not supported by your browser.')
  }

  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position)

    const long = position.coords.longitude;
    const lat = position.coords.latitude;

    socket.emit('sendLocation', {
      long,
      lat
    }, () => {
      console.log('location sent')
    })
  })
})
const socket = io();

const $messageForm = document.querySelector('#messageForm');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');

const $locationButton = document.querySelector('#sendLocation');
const $messages = document.querySelector('#messages');

// tempaltes
const messageTemplate = document.querySelector('#messageTemplate').innerHTML;
const locationLink = document.querySelector('#locationLink').innerHTML;


$messageForm.addEventListener('submit', (e) => {
  e.preventDefault();

  $messageFormButton.setAttribute('disabled', 'disabled');
  // disable
  const message = e.target.elements.message.value;

  socket.emit('sendMessage', message, (error) => {
    $messageFormButton.removeAttribute('disabled');
    $messageFormInput.value = '';
    $messageFormInput.focus();
    // enable

    if (error) {
      return console.log(error)
    }
    console.log('messaged delivered')
  })
})

socket.on('locationMessage', (url) => {
  console.log(url)
  const html = Mustache.render(locationLink, {
    link: url
  });
  $messages.insertAdjacentHTML('beforeend', html)
})

socket.on('message', (message) => {
  console.log(message)
  const html = Mustache.render(messageTemplate, {
    message
  });
  $messages.insertAdjacentHTML('beforeend', html)
})

$locationButton.addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('geolocation is not supported by your browser.')
  }

  $locationButton.setAttribute('disabled', 'disabled');

  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position)

    const long = position.coords.longitude;
    const lat = position.coords.latitude;

    socket.emit('sendLocation', {
      long,
      lat
    }, () => {
      $locationButton.removeAttribute('disabled');
      console.log('location sent')
    })
  })
})
let socket = io();

//default events connect and disconnect
socket.on('connect', () => {
  console.log('connected to server');

  //only want to send email if connected so it will be nested in connect event
  // socket.emit('createEmail', {
  //   to: 'whoever@example.com',
  //   text: "hey, how are you, when do you wanna meet?"
  // });

  // socket.emit('createMessage', {
  //   to: 'example@example.com',
  //   text: 'hey man do you remember me???'
  // });
});

socket.on('disconnect', () => {
  console.log('disconnected from server');
});


//custom events such as newEmail, createEmail, etc.
// socket.on('newEmail', (email) => {
//   console.log('new email: ', email);
// });


socket.on('newMessage', (message) => {
  console.log(`${message.from}: `, message.text);
  //ALTHOUGH THIS METHOD WORKS, IT DOESNT PROTECT AGAINST HTML OR JS INJECTIONS
  //BECAUSE ITS JUST STRING INTERPOLATION
  let listMessage = `<li>${message.from}: ${message.text}</li>`;
  document.querySelector('#messages').insertAdjacentHTML('beforeend', listMessage);
});

socket.on('newLocationMessage', (location) => {
  console.log(`${location.text}`);
  let listLocation = `<li><a target="_blank" href="${location.url}">my location</a></li>`;
  document.querySelector('#messages').insertAdjacentHTML('beforeend', listLocation);
});



//form JS
let chatForm = document.querySelector('#chat-form');
chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  socket.emit('createMessage', {
    from: 'user',
    text: document.querySelector('input[name=message]').value
  }, () => {

  });
});

let locationButton = document.querySelector('#send-location');
locationButton.addEventListener('click', (event) => {
  event.preventDefault();
  if (!navigator.geolocation) {
    return alert('geolocation not supported by your browser, sorry');
  }

  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, () => {
    alert('unable to fetch location :(');
  });
});

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
  let listMessage = `<li>${message.from}: ${message.text}</li>`
  document.querySelector('#messages').insertAdjacentHTML('beforeend', listMessage);
});




//form JS with normal JS and a little jQuery
let chatForm = document.querySelector('#chat-form');
chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  socket.emit('createMessage', {
    from: 'user',
    text: document.querySelector('input[name=message]').value
  }, () => {

  });
});

let socket = io();


let scrollToBottom = () => {
  // selectors
  let messages = document.querySelector('#messages');
  // console.log(messages.children);
  // console.log(messages.children[messages.children.length - 1]);
  let newMessage = messages.children[messages.children.length - 1];
  // let lastMessage = messages.children[messages.children.length - 2];
  // heights
  let clientHeight = messages.clientHeight;
  let scrollTop = messages.scrollTop;
  let scrollHeight = messages.scrollHeight;
  let messageHeight = newMessage.clientHeight * 2;
  // console.log(messageHeight);
  // let lastMessageHeight = lastMessage.innerHeight;

  if (clientHeight + scrollTop + messageHeight >= scrollHeight) {
    //should scroll
    // console.log('should scroll');
    messages.scrollTo(0, scrollHeight);
  }
};

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
  let params = jQuery.deparam(window.location.search);
  socket.emit('join', params, (error) => {
    if (error) {
      // redirect user back to join page
      alert(error);
      window.location.href = '/';
    } else {
      console.log('no error in joining');
    }
  });
});

socket.on('disconnect', () => {
  console.log('disconnected from server');
});


//custom events such as newEmail, createEmail, etc.
// socket.on('newEmail', (email) => {
//   console.log('new email: ', email);
// });


socket.on('newMessage', (message) => {
  let formattedTime = moment(message.createdAt).format('h:mm a');
  let template = document.querySelector('#message-template').innerHTML;
  console.log(template);
  let html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  document.querySelector('#messages').insertAdjacentHTML('beforeend', html);
  scrollToBottom();



  // let formattedTime = moment(message.createdAt).format('h:mm a');
  // console.log(`${message.from}: `, message.text);
  // //ALTHOUGH THIS METHOD WORKS, IT DOESNT PROTECT AGAINST HTML OR JS INJECTIONS
  // //BECAUSE ITS JUST STRING INTERPOLATION
  // let listMessage = `<li>${message.from} (${formattedTime}): ${message.text}</li>`;
  // document.querySelector('#messages').insertAdjacentHTML('beforeend', listMessage);
});

socket.on('newLocationMessage', (location) => {
  let formattedTime = moment(location.createdAt).format('h:mm a');
  let template = document.querySelector('#location-message-template').innerHTML;
  let html = Mustache.render(template, {
    from: 'user',
    url: location.url,
    createdAt: formattedTime
  });
  document.querySelector('#messages').insertAdjacentHTML('beforeend', html);
  scrollToBottom();

  // let formattedTime = moment(location.createdAt).format('h:mm a');
  // console.log(`${location.text}`);
  // let listLocation = `<li>user (${formattedTime}): <a target="_blank" href="${location.url}">my location</a></li>`;
  // document.querySelector('#messages').insertAdjacentHTML('beforeend', listLocation);
});



//form JS
let chatForm = document.querySelector('#chat-form');
chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let inputTextbox = document.querySelector('input[name=message]');
  socket.emit('createMessage', {
    from: 'user',
    text: inputTextbox.value
  }, () => {
    inputTextbox.value = null;
  });
});

let locationButton = document.querySelector('#send-location');
locationButton.addEventListener('click', (event) => {
  event.preventDefault();
  if (!navigator.geolocation) {
    return alert('geolocation not supported by your browser, sorry');
  }

  locationButton.disabled = true;
  locationButton.innerText = "Sending location...";

  let reEnableButton = () => {
    locationButton.disabled = false;
    locationButton.innerText = "Send location";
  };

  navigator.geolocation.getCurrentPosition((position) => {
    reEnableButton();
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, () => {
    reEnableButton();
    alert('unable to fetch location :(');
  });
});

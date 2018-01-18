// built in node modules thus no need to npm install
const path = require('path');
const http = require('http');

// external modules
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require("./utils/message");
const {isRealString} = require("./utils/validations");
const {Users} = require("./utils/users");
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const users = new Users();


// const server = http.createServer((request, response) => {

// });
// however because express and http modules are highly integrated we can just do:
const server = http.createServer(app);
const io = socketIO(server);



app.use(express.static(publicPath));
// app.get('/', (request, response) => {
//   response.sendFile(publicPath);
// });

//io.on is an eventListener meaning waiting for something to happen
//in this case waiting for a connection to the server
io.on('connection', (socket) => {
  console.log('new user connected');

  //emit will create events rather than on which listens to events
  // socket.emit('newEmail', {
  //   from: "blah@example.com",
  //   text: "hey whats up",
  //   createdAt: 123
  // });

  // socket.on('createEmail', (newEmail) => {
  //   console.log('create email: ', newEmail);
  // });

  // socket.emit('newMessage', {
  //   from: 'blahblah@example.com',
  //   text: 'hey whats up guyssss',
  //   createdAt: new Date().getTime()
  // });

  socket.on('join', (params, callback) => {
    name = params.name;
    room = params.room;
    id = socket.id;
    if (!isRealString(name) || !isRealString(room)) {
      return callback('error: name and room name are required');
    }
    socket.join(room);
    // socket.id is a unique id to the websocket given to every user
    // here we first remove the user from all other rooms
    // then add him back to Users class
    users.removeUser(id);
    users.addUser(id, name, room);
    io.to(room).emit('updateUserList', users.getUserList(room));
    // socket.leave('the office fans');

    // io.emit
    // socket.broadcast.emit
    // socket.emit

    // io.to('the office fans').emit
      // this will send message to all users only in the room 'office fans'

    // socket.broadcast.to('the office fans').emit
      // sends message to everyone but the single user in room 'the office fans'

    socket.emit('newMessage', generateMessage('admin', 'welcome new user!'));
    socket.broadcast.to(room).emit('newMessage', generateMessage('admin', `${name} has joined room`));
    callback(null);
  });

  socket.on('createMessage', (newMessage, callback) => {
    // console.log('create email: ', newMessage);
    //while socket.emit emits an event to a single connection
    //io.emit emits an event to all connections
    let user = users.getUser(socket.id);
    if (user && isRealString(newMessage.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, newMessage.text));
    }
    callback('this is from the server');

    //braoadcast will send, everyone BUT the user specified
    //thus in this case everyone will see the message you sent
    //except yourself
    // socket.broadcast.emit('newMessage', {
    //   from: newMessage.from,
    //   text: newMessage.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('createLocationMessage', (newLocation, callback) => {
    let user = users.getUser(socket.id);
    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, newLocation.latitude, newLocation.longitude));
    }
  });

  //default event disconnect
  socket.on('disconnect', () => {
    id = socket.id;
    let user = users.removeUser(id);
    if (user) {
      //will update list of users displayed on client side if user leaves
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('admin', `${user.name} has left`));
    }
    console.log('user disconnected');
  });
});


// since now we are using http server instead of express app server we need to do:
// app.listen(port, () => {
//   console.log(`server up on port ${port}`);
// });
server.listen(port, () => {
  console.log(`server up on port ${port}`);
});

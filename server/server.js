// built in node modules thus no need to npm install
const path = require('path');
const http = require('http');

// external modules
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();


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

  socket.on('disconnect', () => {
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

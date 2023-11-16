const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server)

var currentTurn = "x";

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/nodeApp.html');
});

app.use(express.static("../"));

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  server.listen(8080, () => {
    console.log('listening on *:8080');
  });

  //server side event handling
  io.on('connection', (socket) => {
    socket.on('tile clicked', (tile) => {
      if (currentTurn == "x") {
        io.emit('changeTile',[tile,currentTurn])
        currentTurn = "o";
      }
      else if (currentTurn == "o") {
        io.emit('changeTile',[tile,currentTurn])
        currentTurn = "x";
      }
    });
  });
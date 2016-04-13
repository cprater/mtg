import ws from 'ws';
import url from 'url';
import http from 'http';
import express from 'express';
//import Game from '../engine/game';

const server = http.createServer();
const WebSocketServer = ws.Server;
const wss = new WebSocketServer({ server });
const app = express();

app.use(function (req, res) { res.send({ msg: "hello" }); });

const games = [];

let count = 0;

wss.on('connection', socket => {
  count++;

  if (count === 2) {
    socket.send('hello')
  }

  socket.on('message', messageString => {
    const message = JSON.parse(messageString);

    if (message.type === 'join-room') {
      rooms.find(room => room.id === message.data.id).addPlayer(message.data.player);
    }

    if ( message.type === 'room-list' ) {
      socket.send(JSON.stringify(games));
    }
  });

});

server.on('request', app);
server.listen(3000, () => console.log(`Listening on ${server.address().port}`));

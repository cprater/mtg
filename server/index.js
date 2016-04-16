// mocha --compilers js:babel-core/register --require babel-polyfill
import ws from 'ws';
import url from 'url';
import http from 'http';
import 'babel-polyfill';
import 'babel-core/register';
import express from 'express';
import routes from './routes/index';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const server = http.createServer();
const WebSocketServer = ws.Server;
const wss = new WebSocketServer({ server });
const app = express();

app.use(cookieParser('SIGNED-COOKIE-SECRET'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

const games = [];

wss.on('connection', socket => {
  socket.on('message', messageString => {
    const message = JSON.parse(messageString);

    if (message.type === 'join-room') {
      // rooms.find(room => room.id === message.data.id).addPlayer(message.data.player);
    }

    if ( message.type === 'room-list' ) {
      socket.send(JSON.stringify(games));
    }
  });

});

server.on('request', app);
server.listen(3000, () => console.log(`Listening on ${server.address().port}`));

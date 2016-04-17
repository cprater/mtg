// mocha --compilers js:babel-core/register --require babel-polyfill
import ws from 'ws';
import http from 'http';
import cors from 'cors';
import 'babel-polyfill';
import 'babel-core/register';
import express from 'express';
import routes from './routes/index';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import redis from './helpers/redis-promise';

const server = http.createServer();
const WebSocketServer = ws.Server;
const wss = new WebSocketServer({ server });
const app = express();

app.use(cors({ credentials: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

const games = [];
const connections = {};

wss.on('connection', async socket => {

  const cookieString = socket.upgradeReq.headers.cookie;
  const cookieParsed = cookieString.split('; ').reduce((pv, cv) => {
    pv[cv.split('=')[0]] = cv.split('=')[1];
    return pv;
  }, {});

  const user = await redis.hgetallAsync(`user:${cookieParsed['login-user']}`);

  if (!user || cookieParsed['login-token'] !== SHA256(user.id + user.password + user.salt + user.email.toLowerCase()).toString()) {
    return socket.close();
  }

  connections[cookieParsed['login-user']] = socket;

  socket.on('message', messageString => {
    const message = JSON.parse(messageString);

    if (message.type === 'join-room') {
      // rooms.find(room => room.id === message.data.id).addPlayer(message.data.player);
    }

    if (message.type === 'room-list') {
      socket.send(JSON.stringify(games));
    }
  });
});

server.on('request', app);
server.listen(3000, () => console.log(`Listening on ${server.address().port}`));

// mocha --compilers js:babel-core/register --require babel-polyfill
import ws from 'ws';
import http from 'http';
import cors from 'cors';
import 'babel-polyfill';
import 'babel-core/register';
import express from 'express';
import routes from './routes/index';
import bodyParser from 'body-parser';
import storage from './helpers/storage';
import cookieParser from 'cookie-parser';
import socketRouter from './socket-routes/router';
import authenticateRequest from './helpers/authenticate-request';

const server = http.createServer();
const WebSocketServer = ws.Server;
const wss = new WebSocketServer({ server });
const app = express();

app.use(cors({ credentials: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

wss.on('connection', socket => {
  const user = authenticateRequest(socket.upgradeReq.headers.cookie);

  if (!user) { return socket.close(); }

  storage.push('connections', { id: user.id, socket });

  socket.on('message', message => socketRouter(JSON.parse(message), socket, user));
  socket.on('close', () => storage.remove('connections', user.id));

  return user;
});

server.on('request', app);
server.listen(3000, () => console.log(`Listening on ${server.address().port}`));

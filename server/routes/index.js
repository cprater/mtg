import express from 'express';
import redis from 'redis';
import bluebird from 'bluebird';
import SHA256 from 'crypto-js/sha256';
import uuid from 'node-uuid';

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const client = redis.createClient();
const app = express();

app.post('/login', async (req, res) => {
  if (!req.body)
    return res.status(400).end();

  const { email, password } = req.body;
  const ID = SHA256(email.toLowerCase()).toString();
  const existingUser = await client.hgetallAsync(`user:${ID}`);

  if (existingUser.password === SHA256(password + existingUser.salt).toString()) {
    const ACCESS_TOKEN = SHA256(ID + existingUser.password + existingUser.salt + email.toLowerCase()).toString();

    res.cookie('login-user', ID, { maxAge: 900000, httpOnly: true });
    res.cookie('login-token', ACCESS_TOKEN, { maxAge: 900000, httpOnly: true });
    return res.status(200).end();
  }

  return res.status(400).end();
});

app.post('/user', async (req, res) => {
  if (!req.body)
    return res.status(400).end();

  const { email, password } = req.body;

  const ID = SHA256(email.toLowerCase()).toString();
  const SALT = SHA256(Date.now()).toString();
  const pHASH = SHA256(password + SALT).toString();

  const existingUser = await client.hgetAsync(`user:${ID}`, 'password');

  if (existingUser) {
    return res.status(400).json({ message: 'Email is already in use.'});
  }

  await client.hmsetAsync(`user:${ID}`, 'id', ID, 'email', email.toLowerCase(), 'password', pHASH, 'salt', SALT);
  const ACCESS_TOKEN = SHA256(ID + pHASH + SALT + email.toLowerCase()).toString();

  res.cookie('login-user', ID, { maxAge: 900000, httpOnly: true });
  res.cookie('login-token', ACCESS_TOKEN, { maxAge: 900000, httpOnly: true });
  return res.status(200).end();
});

export default app;

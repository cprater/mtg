import SHA256 from 'crypto-js/sha256';
import redis from '../../helpers/redis-promise';

export default async function usersPost(req, res) {
  const { email, password } = req.body;

  if (!req.body || !email || !password) return res.status(400).end();

  const ID = SHA256(email.toLowerCase()).toString();
  const SALT = SHA256(Date.now()).toString();
  const pHASH = SHA256(password + SALT).toString();

  const existingUser = await redis.hgetAsync(`user:${ID}`, 'password');

  if (existingUser) {
    return res.status(400).json({ message: 'Email is already in use.'});
  }

  await client.hmsetAsync(`user:${ID}`, 'id', ID, 'email', email.toLowerCase(), 'password', pHASH, 'salt', SALT);
  const ACCESS_TOKEN = SHA256(ID + pHASH + SALT + email.toLowerCase()).toString();

  res.cookie('login-user', ID, { maxAge: 900000, httpOnly: true });
  res.cookie('login-token', ACCESS_TOKEN, { maxAge: 900000, httpOnly: true });
  return res.status(201).end();
}

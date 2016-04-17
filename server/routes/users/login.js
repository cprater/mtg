import SHA256 from 'crypto-js/sha256';
import redis from '../../helpers/redis-promise';

export default async function usersPost(req, res) {
  const { email, password } = req.body;

  if (!req.body || !email || !password) return res.status(400).end();

  const ID = SHA256(email.toLowerCase()).toString();
  const existingUser = await redis.hgetallAsync(`user:${ID}`);

  if (existingUser && existingUser.password === SHA256(password + existingUser.salt).toString()) {
    const ACCESS_TOKEN = SHA256(ID + existingUser.password + existingUser.salt + email.toLowerCase()).toString();
    return res.json({ 'login-user': ID, 'login-token': ACCESS_TOKEN });
  }

  return res.status(401).end();
}

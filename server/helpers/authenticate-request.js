import redis from './redis-promise';
import SHA256 from 'crypto-js/sha256';

export default async function authenticateUser(email, password) {
  const ID = SHA256(email.toLowerCase()).toString();
  const existingUser = await client.hgetallAsync(`user:${ID}`);

  return existingUser.password === SHA256(password + existingUser.salt).toString();
}

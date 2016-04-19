import redis from './redis-promise';
import SHA256 from 'crypto-js/sha256';

export default async function authenticateUser(cookieHeader) {
  const cookieParsed = cookieHeader.split('; ').reduce((pv, cv) => {
    pv[cv.split('=')[0]] = cv.split('=')[1];
    return pv;
  }, {});

  const user = await redis.hgetallAsync(`user:${cookieParsed['login-user']}`);

  return (
    user &&
    cookieParsed['login-token'] ===
    SHA256(user.id + user.password + user.salt + user.email.toLowerCase()).toString()
  ) ? user : false;
}

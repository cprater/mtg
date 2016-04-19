import storage from './helpers/storage';
import room from './room';

function list() {
  return storage.get('rooms');
}

function create(user) {
  const rooms = storage.get('rooms');
  const room = new Room(user.id);

  rooms.push(rooms);
}

export default function (message, socket, user) {
  switch (message.action) {
    case 'list':
      return socket.send(JSON.stringify(list()));

    case 'create':
      return socket.send();

    default:
      return false;
  }
}

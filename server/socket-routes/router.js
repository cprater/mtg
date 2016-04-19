import roomRoute from './room-routes';

export default function (message, socket, user) {
  switch (message.type) {
    case 'room':
      return roomRoute(message, socket, user);

    default:
      return false;
  }
}

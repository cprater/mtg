import { PLAYER_JOINED } from '../actions';

export default function playerReducer(state, action) {
  const { type, email } = action;

  if (type === PLAYER_JOINED && state.players.indexOf(email) === -1) {
    return [].concat(state.players, email);
  }

  return state.players;
}

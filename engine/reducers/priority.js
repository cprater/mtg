import { PRIORITY_PASS } from '../actions';

export default function priorityReducer(state, action) {
  const { type, activePlayer } = action;
  const { players } = state;

  if (type !== PRIORITY_PASS) {
    return state.priority;
  }

  // TODO look into a better way for this for 2 headed
  return players.filter(player => player !== activePlayer)[0];
}

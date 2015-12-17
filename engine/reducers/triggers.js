import { PRIORITY_PASS } from '../actions';
import stateBasedActions from '../state-based-actions';

export default function triggerReducer(state, action) {
  const { type, activePlayer } = action;
  const { players } = state;

  if (type === PRIORITY_PASS) {

    // TODO: run state based actions
    const triggers = stateBasedActions(state);
  }

  // run the reducers for all cards in play

  return [];
}

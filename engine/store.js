import phaseReducer from './reducers/phase';
import playerReducer from './reducers/players';
import priorityReducer from './reducers/priority';
import stackReducer from './reducers/stack';
import triggerReducer from './reducers/triggers';
import { UNTAP_STEP } from './constants';

const { assign } = Object;

const initialState = {
  turn: 0,
  phase: UNTAP_STEP,
  manaPool: [],
  activePlayers: [],
  priority: [],
  stack: [],
  battlefield: [],
  graveyard: [],
  players: [],
  triggers: [],
};

export default function reducer(state, action) {
  if (action.type === '@@redux/INIT') {
    return initialState;
  }

  // validate an action is correct (ie that it contains the correct hash)

  return {
    players: playerReducer(state, action),
    phase: phaseReducer(state, action),
    priority: priorityReducer(state, action),
    stack: stackReducer(state, action),
    battlefield: [],
    graveyard: [],
    triggers: triggerReducer(state, action),
  };
}

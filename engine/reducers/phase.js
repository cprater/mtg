import { CHANGE_STEP } from '../actions';
import {
  UNTAP_STEP,
  UPKEEP_STEP
} from '../constants';

function phaseReducer(state, action) {
  const { type, nextStep } = action;

  if (type !== CHANGE_STEP) { return state.phase; }

  switch (nextStep) {
    case UNTAP_STEP:
      // if (state.phase === 'cleanup' && state.stack.length === 0 && state.priority.allPassed) {
      //   return UNTAP_STEP;
      // }

      return UNTAP_STEP;

    default: return state.phase;
  }
}

export default phaseReducer;

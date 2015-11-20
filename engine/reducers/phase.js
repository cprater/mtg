import { CHANGE_STEP } from '../actions';
import { UNTAP_STEP } from '../constants';

function phaseReducer(state = phase, action) {
  switch (action.type) {
    case UNTAP_STEP:
      if (state.phase === 'cleanup' && state.stack.length === 0 && state.priority.allPassed) {
        return UNTAP_STEP;
      }

      // TODO: throw error that it was an invalid action
      return state;

    default:
      return UNTAP_STEP;
  }
}

export default phaseReducer;

import { CHANGE_STEP } from '../actions';
import {
  UNTAP_STEP,
  UPKEEP_STEP,
  DRAW_STEP,
  PRE_MAIN_PHASE,
  BEGINNING_COMBAT_STEP,
  DECLARE_ATTACKERS_STEP,
  DECLARE_BLOCKERS_STEP,
  COMBAT_DAMAGE_STEP,
  END_COMBAT_STEP,
  POST_MAIN_PHASE,
  END_STEP,
  CLEANUP_STEP,
} from '../constants';


const stepsInOrder = {
  UNTAP_STEP: CLEANUP_STEP,
  UPKEEP_STEP: UNTAP_STEP,
  DRAW_STEP: UPKEEP_STEP,
  PRE_MAIN_PHASE: DRAW_STEP,
  BEGINNING_COMBAT_STEP: PRE_MAIN_PHASE,
  DECLARE_ATTACKERS_STEP: BEGINNING_COMBAT_STEP,
  DECLARE_BLOCKERS_STEP: DECLARE_ATTACKERS_STEP,
  COMBAT_DAMAGE_STEP: DECLARE_BLOCKERS_STEP,
  END_COMBAT_STEP: COMBAT_DAMAGE_STEP,
  POST_MAIN_PHASE: END_COMBAT_STEP,
  END_STEP: POST_MAIN_PHASE,
  CLEANUP_STEP: END_STEP,
};

export default function phaseReducer(state, action) {
  const { stack } = state;
  const { type, nextStep } = action;

  if (type !== CHANGE_STEP) { return state.phase; }
  if (stack.length > 0) { return state.phase; }

  // This is to check if the next step directly preseeds
  // the current step
  if (stepsInOrder[nextStep] === state.phase) {
    return nextStep;
  }

  return state.phase;
}

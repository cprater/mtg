import { PRIORITY_PASS } from '../actions';
import { canCastSpell } from '../utils/casting-spells';


export default function stackReducer(state, action) {
  const { type, spell, mana } = action;
  const { priortyPlayers, phase } = state;

  if (type === CAST_SPELL) {
    const spellType = spell.getType();








  }






  if (type === PRIORITY_PASS) {
    // if the person who passed was the passive player then resolve the top spell
    //const topSpell = state.stack.pop();
    //topSpell.resolve();

    //return [].concat(state.stack.slice(1));
  }
}

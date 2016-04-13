import Creature from '../creature';

class FurtiveHomunculus extends Creature {
  default() {
    return {
      cost: '{1}{U}',
      power: 2,
      toughness: 1,
      abilities: ['Skulk'],
      type: ['Homunculus']
    };
  }
}

export default FurtiveHomunculus;

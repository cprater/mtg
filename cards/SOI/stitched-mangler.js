import Creature from '../creature';

class StitchedMangler extends Creature {
  default() {
    return {
      cost: '{2}{U}',
      power: 2,
      toughness: 3,
      abilities: ['Skulk'],
      type: ['Zombie', 'Horror']
    };
  },

  onEnteredBattlefield() {
    // TODO this is not actually how we are going to do it
    this.tapped = true;

    // send trigger to stack
    /*
      this.game.trigger({
        source: this,
        legalTargets(target) {
          return target.type.contains('Creature') && target.controller !== this.controller;
        },
        selectedTarget(target) {
          //create a one-shot effect at upkeep
        }
      })
    */
  }
}

export default StitchedMangler;

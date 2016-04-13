import Creature from '../creature';

class Tarmogoyf extends Creature {
  constructor() {
    super();
    this.castingCost = '{1}{G}';
    this.cardText = `Tarmogoyf's power is equal to the number of card types
                    among cards in all graveyards and its toughness is
                    equal to that number plus 1.`;

    this.types = ['Lhurgoyf'];
  }

  subLayerA() {
    const numOfTypes = this.state.graveyard.uniq('type').length;
    return { power: numOfTypes, toughness: numOfTypes + 1 };
  }
}

export default Tarmogoyf;

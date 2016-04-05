import Creature from '../creature';

class Tarmogoyf extends Creature {

  constructor() {
    super();
    this.castingCost = '{1}{G}';
  }

  subLayerA() {
    const numOfTypes = this.state.graveyard.uniq('type').length;
    return { power: numOfTypes, toughness: numOfTypes + 1 };
  }

}

export default Tarmogoyf;

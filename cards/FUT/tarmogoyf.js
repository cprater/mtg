import { computedPower, computedTower, computeCastingCost } from '../computed-properties';

//@creature('Tarmogoyf')
export default class Tarmogoyf {
  static name = 'Tarmogofy';

  power = computedPower.apply(this, [0, 1]);
  toughness = computedToughness.apply(this, [0, 1]);
  castingCost = computeCastingCost.call(this, '{1}{G}');

  constructor() {
    super();

    this.layers.add('subLayerATriggers', {
      compute(state) {
        const numOfTypes = state.graveyard.uniq('type').length;
        return { power: numOfTypes, toughness: numOfTypes + 1 };
      }
    });
  }

  // http://www.gatheringmagic.com/do-you-really-know-how-to-cast-spells/
  cast(mana) {
    if (canCast(mana, this.castingCost())) {
      this.dispatch({ type: "CAST", card: this, mana});
    }
  }

  altCastingOptions() {
    // Delve, convoke, phyrixian mana, FoW
    return [];
  }

  castingOptions() {
    // TODO split this if there is split mana
    return [this.castingCosts()].concat(this.altCastingOptions());
  }
}

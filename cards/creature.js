import Permanent from './permanent';

/*
* http://www.gatheringmagic.com/the-seven-layer-cake/
* http://www.gatheringmagic.com/do-you-really-know-how-to-cast-spells/
*/

class Creature extends Permanent {

  constructor() {
    super();

    this.basePower = 0;
    this.baseToughness = 0;

    this.counters = [];
  }

  power() { this.layer7().power; }

  toughness() { this.layer7().toughness; }

  /*
  * Power/Toughness
  *
  * This layer is actually broken down into five “sublayers” because P/T effects can
  * sometimes get pretty complicated and there are multiple types of effects that affect P/T.
  */
  layer7() {
    let power = this.basePower;
    let toughness = this.baseToughness;

    { power, toughness } += this.subLayerA();

    if (this.subLayerB()) {
      const layerB = this.subLayerB();
      { power, toughness } = layerB;
    }

    { power, toughness } += this.subLayerC();
    { power, toughness } += this.subLayerD();
    { power, toughness } += this.subLayerE(power, toughness);

    return { power, toughness };
  }

  /*
  * Characteristic-Defining Abilities
  *
  * This is where you would apply the effect of Tarmogoyf or Dungrove Elder.
  * Pretty much any creature with asterisks (*) in the P/T slot
  * is using a CDA to determine its power and toughness.
  */
  subLayerA() {
    return { power: 0, toughness: 0 };
  }

  /*
  * Power and Toughness Setting Abilities
  *
  * This is where you apply effects that set the P/T to a certain value.
  * Diminish turning a creature into a 1/1 would apply here.
  */
  subLayerB() {
    return this.effects.layerB[this.effects.layerB.length - 1];
  }

  /*
  * Power and Toughness Modifying without Counters
  *
  * This is where Giant Growth and Grasp of Darkness would apply—any effect
  * that modifies a P/T by a certain amount without using counters.
  */
  subLayerC() {
    return this.effects.layerC.reduce((pValue, cValue) => {
      return { power: cValue.power + pValue.power, toughness: cValue.toughness + pValue.toughness };
    }, { power: 0, toughness: 0 });
  }

  /*
  * Power and Toughness Modifying with Counters
  *
  * This is where +X/+X counters and -X/-X Counters apply.
  */
  subLayerD() {
    return this.counters.reduce((pValue, cValue) => {
      return { power: cValue.power + pValue.power, toughness: cValue.toughness + pValue.toughness };
    }, { power: 0, toughness: 0 });
  }

  /*
  * Power and Toughness Switching
  *
  * This is where things that switch power and toughness apply.
  * A good example of this is the effect of Twisted Image.
  * It’s good to remember that switching always happens last.
  */
  subLayerE(power, toughness) {
    return this.effects.layerE.reduce(pValue, currentEffect => {
      const performedEffect = currentEffect.perform({ pValue.power, pValue.toughness });

      return { power: performedEffect.power, toughness: performedEffect.toughness };
    }, { power, toughness });
  }
}

export default creature;

import Card from './card';

class Permanent extends Card {
  constructor() {
    super();

    this.effects = {
      layer1: [],
      layerB: [],
      layerC: [],
      layerE: []
    };

    this.on = {
      cast() {},
      resolved() {},
      enteredBattlefield() {},
      leftBattleField() {},
      enteredGraveyard() {},
      leftGraveyard() {}
    };
  }

  /*
  * Copy
  *
  * This is the layer where you apply “copy effects.” These are going
  * to be effects that mention the word “copy” in there somewhere.
  * Some great examples are Clone and Quicksilver Gargantuan.
  */
  layer1() {
    // TODO: think about this
    return this.effects.layer1.forEach(effect => effect.compute());
  }

  /*
  * Control
  *
  * This is the layer where you apply control-changing effects.
  * Some good cards with control abilities on them are Sower of
  * Temptation and Mind Control.
  */
  layer2() {

  }

  /*
  * Text
  *
  * This is where you apply effects that change the text of your permanent.
  * An example of a text-changing effect is on the card Sleight of Mind.
  */
  layer3() {

  }

  /*
  * Type
  *
  * This is where you apply effects that change the type of the permanent.
  * This is the layer being used in that Urborg, Tomb of Yaygmoth/Blood Moon
  * example above. Both of those cards want to change the type of permanents.
  */
  layer4() {

  }

  /*
  * Color
  *
  * This is where you apply effects that change the color of a permanent.
  * Things like Thoughtlace or Chaoslace or any of those other junk
  * rare ’laces from Alpha change the color of permanents.
  */
  layer5() {

  }

  /*
  * Abilities
  *
  * This is where you apply effects that add or remove abilities to a permanent.
  * This is where Jump and the Deathtouch part of Virulent Swipe will apply.
  */
  layer6() {

  }
}

export default Permanent;

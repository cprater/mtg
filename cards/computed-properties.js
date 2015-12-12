export function computedPower(power = 0, toughness = 0) {
  return () => {
    return computedPowerToughness().power;
  };
}

export function computedTower(power = 0, toughness = 0) {
  return () => {
    return computedPowerToughness().toughness;
  };
}

function computedPowerToughness() {
  const { layers, store } = this;
  const state = store.getState();

  const layerA = computeSublayerA(layers.getSublayerATriggers(), state);

  if (layerA) {
    power = layerA.power;
    toughness = layerA.toughness;
  }

  const layerB = computeSublayerB(layers.getSublayerBTriggers(), state);

  if (layerB) {
    power = layerB.power;
    toughness = layerB.toughness;
  }

  const layerC = computeSublayerC(layers.getSublayerCTriggers(), state);
  power += layerC.power;
  toughness += layerC.toughness;

  const layerD = computeSublayerC(layers.getSublayerDTriggers(), state);
  power += layerD.power;
  toughness += layerD.toughness;

  const layerE = computeSublayerE(layers.getSublayerETriggers(), power, toughness, state);

  if(layerE) {
    power = layerE.power;
    toughness = layerE.toughness;
  }

  return { power, toughness };
}

export function computeCastingCost(baseCost = '0') {
  return () => {
 		const { layers, store } = this;
    const state = store.getState();
    // TODO
    return baseCost;
  };
}


// http://www.gatheringmagic.com/the-seven-layer-cake/

/*
* Sublayer A – Characteristic-Defining Abilities
*  This is where you would apply the effect of Tarmogoyf or Dungrove Elder.
*  Pretty much any creature with asterisks (*) in the P/T slot is using a CDA to determine its power and toughness.
*/
export function comptuteSublayerA(triggers, state) {
  let power, toughness;

  const values = triggers.map(trigger => trigger.compute(state));

  if (values.length > 0) {
    return values[values.length - 1];
  }
}


/*
* Sublayer B – Power and Toughness Setting Abilities
* This is where you apply effects that set the P/T to a certain value.
* Diminish turning a creature into a 1/1 would apply here.
*/
export function comptuteSublayerB(triggers, state) {
  let power, toughness;

  const values = triggers.map(trigger => trigger.compute(state));

  if (values.length > 0) {
    return values[values.length - 1];
  }
}

/*
* Sublayer C – Power and Toughness Modifying without Counters
* This is where Giant Growth and Grasp of Darkness would apply—any effect
* that modifies a P/T by a certain amount without using counters.
*/
export function comptuteSublayerC(triggers, state) {
  let power, toughness;

  const value = triggers.reduce((previousValue, currentValue) => {
    const computedValue = trigger.compute(state);
    return {
      power: computedValue.power + previousValue.power,
      toughness: computedValue.toughness + previousValue.toughness
    };
  }, { power: 0, toughness: 0 });

  return value;
}

/*
* Sublayer D – Power and Toughness Modifying with Counters
* This is where +X/+X counters and -X/-X Counters apply.
*/
export function comptuteSublayerD(triggers, state) {
  let power, toughness;

  const value = triggers.reduce((previousValue, currentValue) => {
    const computedValue = trigger.compute(state);
    return {
      power: computedValue.power + previousValue.power,
      toughness: computedValue.toughness + previousValue.toughness
    };
  }, { power: 0, toughness: 0 });

  return value;
}

/*
* Sublayer E – Power and Toughness Switching
* This is where things that switch power and toughness apply.
* A good example of this is the effect of Twisted Image.
* It’s good to remember that switching always happens last.
*/
export function comptuteSublayerE(triggers, power, toughness, state) {
  triggers.forEach((previousValue, currentValue) => {
    const computedValue = trigger.compute(state, power, toughness);
    power = computedValue.power;
    toughness = computedValue.toughness;
  });

  return { power, toughness };
}

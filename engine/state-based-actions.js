export default function checkStateBasedActions(state) {
	const { players, creatures } = state;
  const actions = [];

  const deadPlayers = players.filter(player => {
		const lifeTotal = player.lifeTotal();
    const posionDamage = player.posionDamage();

    if (lifeTotal <= 0) {
    	return player;
    }
    else if (posionDamage >= 10) {
    	return player;
    }
  });
  // check if draw from library with no cards

  // check all zones for tokens and copies and remove them if not in battlefield
  /* It is important to note though that the token still goes to the zone before ceasing to exist, so things that trigger on creatures going to the graveyard will still trigger when a token goes to the graveyard. */

  const legendaryCreatures = [];

  const creaturesWithIssues = creatures.filter(creature => {
  	const toughness = creature.toughness();
    const markedDamage = creature.markedDamage();

    if (toughness <= 0) {

    } else if (toughness - markedDamage.reduceBy('amount') <= 0) {

    } else if (markedDamage.filterBy('type', 'deathtouch')) {

    }

    if (creature.getType().includes('legendary') && legendaryCreatures.include(creature.name)) {

    }

    const counters = creature.getSublayerDCounters();
    if (counters.includes(PLUS_ONE_PLUS_ONE) && counters.includes(MINUS_ONE_MINUS_ONE)) {
			// combine counters
    }

  });

	const deadPlanewalkers = planeswalkers.filter(planeswalker => {
  	if (planeswalker.loyalty <= 0) {

    }
  	else if (planeswalkers.uniq('name')) {

    }
  }

  
  // make sure auras are attached

	// equipment move off of stuff
}

class GrimAffliction {
	static name = 'Grim Affliction',
 	castingCost = computeCastingCost('{2}{B}'),

  onResolve(target) {
    target.layers.add('subLayerDCounters', MINUS_MINUS_COUNTER);
    this.store.dispatch('proliferate');
  }
}

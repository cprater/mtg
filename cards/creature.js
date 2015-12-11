
class Creature {
  tapped: false,


  constructor(store) {
    this.store = store;
    store.subscribe(this.subscriber.bind(this));
  }

  subscriber() {
    const state = this.store.getState();

    if (state.phase === 'untap') {
      store.dispatch(uptap(this));
    }
  }
}

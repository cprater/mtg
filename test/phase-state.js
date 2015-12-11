import assert from 'assert';
import state from '../engine/state';
import { changeStep } from '../engine/actions';
import { UNTAP_STEP, UPKEEP_STEP } from '../engine/constants';
import { createStore } from 'redux';

describe('phase state changes happen correctly', () => {

  it('basic test', done => {
    const store = createStore(state);

    store.subscribe(() => {
      const state = store.getState();

      assert.equal(state.phase, UNTAP_STEP);
      done();
    });

    store.dispatch(changeStep(UNTAP_STEP);
  });
});

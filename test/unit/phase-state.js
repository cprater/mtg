import assert from 'assert';
import reduxStore from '../../engine/store';
import { changeStep } from '../../engine/actions';
import { UNTAP_STEP, UPKEEP_STEP, END_STEP } from '../../engine/constants';
import { createStore } from 'redux';

describe('phase state changes happen correctly', () => {

  it('initial state is set to untap step', () => {
    const store = createStore(reduxStore);
    const state = store.getState();

    assert.equal(state.phase, UNTAP_STEP);
  });

  it('cannot change step from untap to end step', done => {
    const store = createStore(reduxStore);

    store.subscribe(() => {
      const state = store.getState();

      assert.equal(state.phase, UNTAP_STEP);
      done();
    });

    store.dispatch(changeStep(END_STEP));
  });

});

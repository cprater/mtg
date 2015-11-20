import { combineReducers } from 'redux'
import phaseReducer from './reducers/phase';
import { UNTAP_STEP } from './constants';

const { assign } = Object;

const initialState = {
	phase: UNTAP_STEP,
	priority: [],
	stack: [],
	battlefield: [],
	graveyard: [],
};

export default function reducer(state = initialState, action) {
  return {
  	phase: phaseReducer(state, action),
	};
});

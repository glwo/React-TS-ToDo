import { combineReducers, Reducer } from 'redux';
import { ConfigActionTypes } from './Config/config.actions';
import configReducer, { ConfigState } from './Config/config.reducer';

export interface RootState {
  config: ConfigState;
}

const rootReducer: Reducer<RootState, ConfigActionTypes> = combineReducers({
  config: configReducer,
});

export default rootReducer;

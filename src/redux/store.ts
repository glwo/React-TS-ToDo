import rootReducer from './rootReducer';

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

const enhancers = [applyMiddleware(thunk)];

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(...enhancers)
);

export default store;

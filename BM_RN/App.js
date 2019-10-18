import React from 'react';
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import masterReducer from './src/redux/reducer/master';

const store = createStore(
  combineReducers([masterReducer]),
  applyMiddleware(logger, thunk),
);
import {Navigator} from './src/navigation/navigation';
const App = () => (
  <Provider store={store}>
    <Navigator />
  </Provider>
);

export default App;

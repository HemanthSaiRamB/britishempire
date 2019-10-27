import React from 'react';
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import masterReducer from './src/redux/reducer/master';

const store = createStore(
  combineReducers({'USER': masterReducer}),
  applyMiddleware(logger, thunk),
);
import {SwitchNav} from './src/navigation/navigation';


const App = () => (
  <Provider store={store}>
    <SwitchNav />
  </Provider>
);

export default App;

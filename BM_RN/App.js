import Navigator from './src/helpers/navigation';
import React from 'react';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {masterReducer} from './src/redux/masterReducer';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {setTopLevelNavigator} from './src/helpers/navigation';
// import {YellowBox} from 'react-native';
const _store = createStore(
  combineReducers({masterReducer}),
  applyMiddleware(logger, thunk),
);
export default function App() {
  return (
    <Provider store={_store}>
      <Navigator
        ref={navigatorRef => {
          setTopLevelNavigator(navigatorRef);
        }}
      />
    </Provider>
  );
}

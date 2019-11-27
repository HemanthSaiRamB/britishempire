import * as React from 'react';
import {AppRegistry} from 'react-native';
import Starter from './App';
import {name as appName} from './app.json';
import {Provider as PaperProvider} from 'react-native-paper';

export default function App() {
  console.disableYellowBox = true;
  return (
    <PaperProvider>
      <Starter />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => App);

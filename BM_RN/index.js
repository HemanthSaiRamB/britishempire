import * as React from 'react';
import {AppRegistry} from 'react-native';
import Starter from './App';
import {name as appName} from './app.json';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#ff1231',
  },
};
export default function App() {
  console.disableYellowBox = true;
  
  return (
    <PaperProvider theme={theme}>
      <Starter />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => App);

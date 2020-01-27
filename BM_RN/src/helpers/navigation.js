import {
  createAppContainer,
  createSwitchNavigator,
  NavigationActions,
} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from '../containers/HomeScreen';
import LoginScreen from '../containers/LoginScreen';
import SignScreen from '../containers/SignScreen';
import {PADetails} from '../containers/PADetails';
import {Master} from '../containers/Master';

const AppStack = createStackNavigator({Home: HomeScreen, PAD: PADetails});
const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: SignScreen,
});
// NAVIGATION USEFULLS

let _navigator;

export function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

export function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}
export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: Master,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);

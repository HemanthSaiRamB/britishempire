import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import {LoginScreen} from '../containers/LoginScreen';
import {RegisterScreen} from '../containers/RegisterScreen';

const navigationOptions = {
  header: null,
};
const stack = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
    },
    Register: {
      screen: RegisterScreen,
    },
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: navigationOptions,
  },
);

const Navigator = createAppContainer(stack);
export {Navigator};

import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import {LoginScreen} from '../containers/LoginScreen';
import {RegisterScreen} from '../containers/RegisterScreen';
import HomeScreen from '../containers/HomeScreen';
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
    Home: {
      screen: HomeScreen,
    },
  },
  {
    initialRouteName: 'Register',
    defaultNavigationOptions: navigationOptions,
  },
);

const Navigator = createAppContainer(stack);
export {Navigator};

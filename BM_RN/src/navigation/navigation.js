import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {LoginScreen} from '../containers/LoginScreen';
import {RegisterScreen} from '../containers/RegisterScreen';
import HomeScreen from '../containers/HomeScreen';
import {createDrawerNavigator} from 'react-navigation-drawer';
import DrawerContainer from '../app/drawer';
import Storage from '../app/storage';

const navigationOptions = {
  header: null,
};

const SignedIn = createDrawerNavigator({
  "Home": {
    screen: HomeScreen
  }
}, {
  initialRouteName: "Home",
  contentComponent: DrawerContainer,
  contentOptions: {
    activeTintColor: '#e91e63',
    itemsContainerStyle: {
      marginVertical: 0,
    },
    iconContainerStyle: {
      opacity: 1
    }
  }
});

const stack = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
    },
    Register: {
      screen: RegisterScreen,
    },
    Home: {
      screen: SignedIn,
    },
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: navigationOptions,
  },
);

function AmIEligible(){
  console.log("data", Storage.getUser());
  return Storage.getUser();
}

const Switch = createSwitchNavigator({
  'LoggedIn': SignedIn,
  'LoggedOut': stack
},{
  initialRouteName: Storage.getUser() ? 'LoggedIn': 'LoggedOut'
});

console.log("AmIEligible() :: ", AmIEligible());

const SwitchNav = createAppContainer(Switch);

const Navigator = createAppContainer(stack);

export {Navigator, SwitchNav};

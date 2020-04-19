import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Title, Subheading, Button, Colors} from 'react-native-paper';
import {scale, verticalScale, moderateScale} from '../helpers/scaler';
import {Logo} from '../components/Logo';
import {Input} from '../components/Input';
import AsyncStorage from '@react-native-community/async-storage';
import {loginAction} from '../redux/Actions/user';
import {Header} from '../components/Header';
import {connect} from 'react-redux';
import firebase from 'react-native-firebase';
import {ForgetScreen} from './ForgetScreen';
class Login extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    token: '',
    reset: false
  };
  static navigationOptions = {
    header: null,
  };
  getToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        this.setState({
          token: fcmToken
        });
      }
    }
  };
  
  checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  };

  requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      this.getToken();
    } catch (error) {
      console.log('permission rejected');
    }
  };

  createNotificationListeners = () => {
    this.onUnsubscribeNotificaitonListener = firebase
      .notifications()
      .onNotification(notification => {
        firebase.notifications().displayNotification(notification);
      });
  };
  hideMenu = () => {
    console.log("Hide");
    this.setState({
      reset: false,
      email: '',
      password: '',
      error: '',
      token: ''
    });
  };

  removeNotificationListeners = () => {
    this.onUnsubscribeNotificaitonListener();
  };

  componentDidMount() {
    // Build a channel
    const channel = new firebase.notifications.Android.Channel(
      'BEF_DUMPING',
      'BEF_DUMPING',
      firebase.notifications.Android.Importance.Max,
    ).setDescription('BEF_DUMPING channel for every user');

    // Create the channel
    firebase.notifications().android.createChannel(channel);
    this.checkPermission();
    this.createNotificationListeners();
  }

  componentWillUnmount() {
    this.removeNotificationListeners();
  }

  updateField = (type, text) => this.setState({[type]: text, error: ''});
  constructor(props) {
    super(props);
  }
  error = data => {
    this.setState({
      error: data,
    }); 
  };
  render() {
    return (
      <View style={styles.mainScroll}>
        <View style={styles.mainPanel}>
          <View style={styles.internalPanel}>
            <Header title={'Welcome back'} subheader={'Sign to continue'} />
            <Subheading style={{alignSelf: 'center', color: Colors.red800}}>
              {this.state.error}
            </Subheading>
            <View style={{paddingTop: verticalScale(10)}}>
              <View style={{paddingVertical: 10}}>
                <Input
                  value={this.state.email}
                  label={'Email Address'}
                  type={'email'}
                  change={this.updateField}
                />
              </View>
              <View style={{paddingVertical: 10}}>
                <Input
                  value={this.state.password}
                  label={'Password'}
                  type={'password'}
                  secure
                  change={this.updateField}
                />
              </View>
              <Button onPress={() => this.setState({reset: true})} style={{justifyContent: 'flex-start'}} mode="text">
                Forgot Password ?
              </Button>
            </View>
            <View style={{paddingTop: verticalScale(20)}}>
              <Button
                style={{
                  height: verticalScale(30),
                  justifyContent: 'center',
                }}
                icon={this.state.loading ? 'loading' : 'lock'}
                mode="contained"
                onPress={() => {
                  loginAction(
                    this.state.email,
                    this.state.password,
                    this.error,
                    this.state.token
                  );
                  this.setState({loading: true});
                }}>
                Login
              </Button>
              <View
                style={{
                  flexDirection: 'row',
                  paddingVertical: verticalScale(10),
                  alignSelf: 'center',
                }}>
                <Subheading style={{alignSelf: 'center'}}>
                  {"Don't have an account "}
                </Subheading>
                <Button
                  mode="text"
                  onPress={() => this.props.navigation.navigate('Register')}>
                  Sign Up
                </Button>
                {
                  this.state.reset === true && 
                  <ForgetScreen visible={this.state.reset} hideModal={this.hideMenu} />
                }
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainScroll: {
    width: '100%',
    height: '100%',
  },
  mainPanel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  internalPanel: {
    width: scale(250),
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  icon: {
    marginVertical: verticalScale(20),
    backgroundColor: '#aab',
    alignSelf: 'center',
  },
  title: {
    fontSize: 31,
  },
});

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);

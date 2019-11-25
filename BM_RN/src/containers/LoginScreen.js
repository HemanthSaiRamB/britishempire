/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Title, Subheading, Button} from 'react-native-paper';
import {scale, verticalScale, moderateScale} from '../helpers/scaler';
import {Logo} from '../components/Logo';
import {Input} from '../components/Input';
import AsyncStorage from '@react-native-community/async-storage';
import {loginAction} from '../redux/Actions/user';
import {connect} from 'react-redux';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };
  static navigationOptions = {
    header: null,
  };
  updateField = (type, text) => this.setState({[type]: text});
  loginAct = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };

  render() {
    return (
      <View style={styles.mainScroll}>
        <View style={styles.mainPanel}>
          <View style={styles.internalPanel}>
            <Logo />
            <View style={{paddingTop: verticalScale(60)}}>
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
              <Button style={{justifyContent: 'flex-start'}} mode="text">
                Forgot Password ?
              </Button>
            </View>
            <View style={{paddingTop: verticalScale(20)}}>
              <Button
                style={{
                  height: verticalScale(30),
                  justifyContent: 'center',
                }}
                icon="lock"
                mode="contained"
                onPress={() => this.props.login(this.state.email, this.state.password)}>
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
                <Button mode="text" onPress={() => this.props.navigation.navigate('Register')}>Sign Up</Button>
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
  return ({

  });
}
const mapDispatchToProps = dispatch => ({
  login: (email, pswd) => dispatch(loginAction(email,pswd))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
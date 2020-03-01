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

class Login extends Component {
  state = {
    email: '',
    password: '',
    error: '',
  };
  static navigationOptions = {
    header: null,
  };
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
                icon={this.state.loading ? 'loading' : 'lock'}
                mode="contained"
                onPress={() => {
                  loginAction(
                    this.state.email,
                    this.state.password,
                    this.error,
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

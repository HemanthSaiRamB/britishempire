/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {Title, Subheading, Button, Switch, Colors} from 'react-native-paper';
import {scale, verticalScale, moderateScale} from '../helpers/scaler';
import {Logo} from '../components/Logo';
import {Input} from '../components/Input';
import {Header} from '../components/Header';
import {registerAction} from './../redux/Actions/user';

export default class SignScreen extends Component {
  state = {
    data: {
      name: '',
      age: '',
      gender: 'male',
      mobilenumber: '',
      email: '',
      password: '',
      cnfpwd: '',
      usertype: '',
      error: '',
    },
  };
  UNSAFE_componentWillUpdate(props, state) {
    console.log(props, state);
  }
  VALIDATOR = () => {
    let {
      name,
      age,
      mobilenumber,
      gender,
      email,
      password,
      cnfpwd,
      usertype,
    } = this.state;
    return (
      name !== '' &&
      age !== '' &&
      mobilenumber !== '' &&
      gender !== '' &&
      email !== '' &&
      password !== '' &&
      cnfpwd !== '' &&
      password === cnfpwd &&
      usertype !== ''
    );
  };
  updateField = (type, text) => {
    console.log(type, text);
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        [type]: text,
      },
      error: '',
    });
  };
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        style={styles.mainScroll}>
        <View style={styles.mainPanel}>
          <View style={styles.internalPanel}>
            <Header
              title={'Create Account'}
              subheader={'Create a new account'}
            />
            <Subheading style={{alignSelf: 'center', color: Colors.red800}}>
              {this.state.error}
            </Subheading>
            <View style={{paddingTop: verticalScale(5)}}>
              <View style={{paddingVertical: 5}}>
                <Input
                  style={{height: 45}}
                  value={this.state.data.name}
                  label={'Name'}
                  type={'name'}
                  change={this.updateField}
                />
              </View>
              <View style={{paddingVertical: 5}}>
                <Input
                  style={{height: 45}}
                  value={this.state.data.age}
                  label={'Date of Birth'}
                  type={'age'}
                  change={this.updateField}
                />
              </View>
              <View style={{paddingVertical: 5}}>
                <Input
                  style={{height: 45}}
                  value={this.state.data.mobilenumber}
                  label={'Phone number'}
                  type={'mobilenumber'}
                  change={this.updateField}
                />
              </View>
              <View style={{paddingVertical: 5}}>
                <Input
                  style={{height: 45}}
                  value={this.state.data.email}
                  label={'Email Address'}
                  type={'email'}
                  change={this.updateField}
                />
              </View>
              <View style={{paddingVertical: 5}}>
                <Input
                  style={{height: 45}}
                  value={this.state.data.password}
                  label={'Password'}
                  type={'password'}
                  secure
                  change={this.updateField}
                />
              </View>
              <View style={{paddingVertical: 5}}>
                <Input
                  style={{height: 45}}
                  value={this.state.data.cnfpwd}
                  label={'Confirm Password'}
                  type={'cnfpwd'}
                  secure
                  change={this.updateField}
                />
              </View>
              {/*  */}
              <View style={{paddingVertical: 10, flexDirection: 'row'}}>
                <View
                  style={{flexDirection: 'row', paddingHorizontal: scale(10)}}>
                  <Subheading style={{paddingHorizontal: scale(10)}}>
                    {'Administrator'}
                  </Subheading>
                  <Switch
                    value={this.state.data.usertype === 'admin'}
                    onValueChange={() => this.updateField('usertype', 'admin')}
                  />
                </View>
                <View
                  style={{flexDirection: 'row', paddingHorizontal: scale(10)}}>
                  <Subheading style={{paddingHorizontal: scale(10)}}>
                    {'Employee'}
                  </Subheading>
                  <Switch
                    value={this.state.data.usertype === 'emp'}
                    onValueChange={() => this.updateField('usertype', 'emp')}
                  />
                </View>
              </View>
              <View style={{paddingTop: verticalScale(20)}}>
                <Button
                  style={{
                    height: verticalScale(30),
                    justifyContent: 'center',
                  }}
                  icon="lock"
                  mode="contained"
                  onPress={() =>
                    this.VALIDATOR()
                      ? registerAction(this.state.data)
                      : this.setState({error: 'Fields not filled properly'})
                  }>
                  Register
                </Button>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: verticalScale(10),
                    alignSelf: 'center',
                  }}>
                  <Subheading style={{alignSelf: 'center'}}>
                    {'Already have an account? '}
                  </Subheading>
                  <Button
                    mode="text"
                    onPress={() => this.props.navigation.navigate('Login')}>
                    Log In
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
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
});

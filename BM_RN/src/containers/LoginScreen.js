/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import {COLORS} from './../app/Colors';
import {verticalScale, scale, moderateScale} from '../helpers/scaler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import {LoginAct} from '../redux/actions/userAction';
import { LOGIN_SUCCESS, LOGIN_FAILURE } from '../redux/actionTypes';
const Logo = function(props) {
  let STYLES = props.style ? props.style : {};
  return (
    <View style={[STYLES, {justifyContent: 'center', width: '100%'}]}>
      <Image
        style={{
          alignSelf: 'center',
          height: verticalScale(100),
          width: scale(250),
        }}
        resizeMode="contain"
        source={require('./../assets/images/logo.png')}
      />
      <Text
        style={{
          fontSize: moderateScale(22),
          textAlign: 'center',
          fontWeight: '500',
          color: COLORS.SECONDARY,
        }}>
        {'Welcome Back'}
      </Text>
      <Text
        style={{
          fontSize: moderateScale(15),
          textAlign: 'center',
          fontWeight: '500',
          color: COLORS.GREY,
        }}>
        {'Sign to continue'}
      </Text>
    </View>
  );
};
const Input = function(props) {
  let STYLES = props.style ? props.style : {};
  let secure = props.secure ? props.secure : false;
  let keyboardType = props.keyType ? props.keyType : 'default';
  let logoType = props.logoType ? props.logoType : 'info';
  console.log(props);
  return (
    <View
      style={[
        STYLES,
        {
          borderColor: COLORS.GREY,
          borderWidth: 2,
          alignSelf: 'center',
          borderRadius: scale(5),
          flexDirection: 'row',
        },
      ]}>
      <Icon
        name={logoType}
        size={moderateScale(20)}
        style={{
          alignSelf: 'center',
          marginLeft: scale(10),
          position: 'absolute',
        }}
        color={COLORS.BLUE}
      />
      <TextInput
        secureTextEntry={secure}
        placeholderTextColor={COLORS.GREY}
        placeholder={props.placeholder}
        keyboardType={props.keyType}
        value={props.data}
        onChangeText={props.onChange}
        style={{
          paddingLeft: scale(45),
          fontSize: scale(16),
          height: verticalScale(45),
          width: '100%',
          fontWeight: 'bold',
        }}
      />
    </View>
  );
};

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'harishsv999@gmail.com',
      pswd: 'Harish@99',
    };
  }
  updateFields = (key, val) => {
    this.setState({
      [key] : val,
    });
  }
  sizeValidate = (val, size = 2) => {
    return val.length > size
  }
  componentDidUpdate(props, state) {
    console.log(props, state);
  }
  UNSAFE_componentWillReceiveProps(props, state){
    console.log('LOGIN', props);
    if(props.type === LOGIN_SUCCESS){
      this.props.navigation.navigate('Home',{'usertype':'', 'action':'log'});
      // Alert.alert('LOGIN', 'LOGIN SUCCESSFUL',props);
    }else if(props.type === LOGIN_FAILURE){
      console.log('LOGIN', 'LOGIN FAILURE');
    }else{
      console.log('LOGIN', 'LOGIN PENDING');
    }
  }
  login = _ => {
    let {email, pswd} = this.state;
    console.log(this.state);
    if(this.sizeValidate(email, 5) && this.sizeValidate(pswd, 4)){
      // Alert.alert('Login', 'Login Successful');
      this.props.LoginAction(email, pswd);
    }else {
      Alert.alert('Login', 'Login not Successful');
    }
  }
  render() {
    return (
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <KeyboardAwareScrollView>
          <Logo style={{marginTop: verticalScale(100)}} />
        
          <View style={{width: '90%', alignSelf: 'center'}}>
              <View style={{width:'100%',marginTop:verticalScale(10), height: verticalScale(40), justifyContent:'center'}}>
                {
                  this.props.detail ? 
                    <Text style={{fontSize:18, color: COLORS.GOOGLE_RED, alignSelf: 'center'}}>{this.props.detail}</Text>
                    : []
                }
              </View> 
            <Input
              style={{marginTop: verticalScale(10)}}
              onChange={val => this.updateFields('email',val)}
              placeholder={'Email Address'}
              keyType={'email-address'}
              data={this.state.email}
              secure={false}
              logoType={'at'}
            />
            <Input
              style={{marginTop: verticalScale(20)}}
              placeholder={'Password'}
              onChange={val => this.updateFields('pswd',val)}
              data={this.state.pswd}
              logoType={'lock'}
              keyType={'default'}
              secure={true}
            />
            <KeyboardSpacer />
            <TouchableHighlight
              onPress={() => {}}
              style={{alignSelf: 'flex-end', marginTop: moderateScale(5)}}>
              <Text
                style={{
                  fontSize: moderateScale(14),
                  fontWeight: 'bold',
                  color: COLORS.BLUE,
                }}>
                {'Forgot Password?'}
              </Text>
            </TouchableHighlight>
          </View>
          <View
            style={{
              marginTop: moderateScale(50),
              width: '100%',
              alignItems: 'center',
            }}>
            <TouchableHighlight
            onPress={this.login}
              style={{
                backgroundColor: COLORS.BLUE,
                width: '90%',
                height: verticalScale(50),
                justifyContent: 'center',
                borderRadius: 5,
              }}>
              <Text
                style={{
                  color: COLORS.PRIMARY,
                  alignSelf: 'center',
                  fontSize: 17,
                  fontWeight: '900',
                }}>
                {'LOGIN'}
              </Text>
            </TouchableHighlight>
          </View>
          <View
            style={{
              justifyContent: 'center',
              marginTop: moderateScale(15),
              flexDirection: 'row',
            }}>
            <Text style={{color: COLORS.GREY, fontSize: moderateScale(14)}}>
              {"Don't have account ?"}
            </Text>
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate('Register')}>
              <Text style={{color: COLORS.BLUE, fontSize: moderateScale(14)}}>
                {' create a new account'}
              </Text>
            </TouchableHighlight>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return ({
    type: state.USER.type,
    detail: state.USER.detail
  });
}

const mapDispatchToProps = dispatch => ({
  LoginAction: () => dispatch(LoginAct())
});

let Login = connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

export {Login as LoginScreen};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY,
  },
  socialBtn: {
    justifyContent: 'center',
    borderColor: COLORS.SECONDARY,
    padding: moderateScale(5),
    height: verticalScale(50),
  },
  socialText: {
    fontSize: 19,
    margin: 10,
  },
  socialPanel: {
    flexDirection: 'row',
    marginTop: verticalScale(20),
  },
  socialTitle: {
    fontSize: 20,
  },
  socialNetworks: {
    marginTop: verticalScale(20),
    padding: 20,
    flexDirection: 'column',
  },
});

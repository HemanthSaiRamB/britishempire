/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
  TouchableHighlight,
} from 'react-native';
import {COLORS} from './../app/Colors';
import {verticalScale, scale, moderateScale} from '../helpers/scaler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import RadioGroup from 'react-native-radio-buttons-group';
import {TextInputMask} from 'react-native-masked-text';
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
        {'Create new Account'}
      </Text>
      <Text
        style={{
          fontSize: moderateScale(15),
          textAlign: 'center',
          fontWeight: '500',
          color: COLORS.GREY,
        }}>
        {'Create a new account'}
      </Text>
    </View>
  );
};
const Input = function(props) {
  let STYLES = props.style ? props.style : {};
  let secure = props.secure ? props.secure : false;
  let keyboardType = props.keyType ? props.keyType : 'default';
  let logoType = props.logoType ? props.logoType : 'info';
  let masked = props.masked ? props.masked : false;
  let dob = props.dob ? props.dob : '';
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
      {
        ! masked ?
          <TextInput
          secureTextEntry={secure}
          placeholderTextColor={COLORS.GREY}
          placeholder={props.placeholder}
          keyboardType={props.keyType}
          onChangeText={props.onChange}
          style={{
            paddingLeft: scale(45),
            fontSize: moderateScale(16),
            width: '100%',
            fontWeight: 'bold',
          }}
        /> : 
        <TextInputMask
          value={dob}
          style={{
            paddingLeft: scale(45),
            fontSize: moderateScale(16),
            width: '100%',
            fontWeight: 'bold',
          }}
          onChangeText={props.onChange}
          placeholderTextColor={COLORS.GREY}
          secureTextEntry={secure}
          keyboardType={props.keyType}
          placeholder={props.placeholder}
          type={'datetime'}
          options={{
            format: 'DD-MM-YYYY'
          }}
    />
      }
    </View>
  );
};

class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:'',
      mobile: '',
      dob:'',
      email: '',
      pswd: '',
      cnfpswd:'',
      gender:'male',
      userType:'emp',
    };
  }
  updateFields = (key, val) => {
    this.setState({
      [key] : val,
    });
  }
  updateChecks = (key, val) => {
    val.length > 0 ? 
        val.forEach((val)=> {
          if(val.selected){
            this.setState({
              [key] : val.value,
            });
          }
        })
        : []
  }
  compareTo = (one, two) => {
    return one === two;
  }
  sizeValidate = (val, size = 2) => {
    return val.length > size
  }
  register = _ => {
    let {name, dob, mobile, email, pswd, cnfpswd, gender, userType} = this.state;
    if( this.compareTo(pswd, cnfpswd) &&  
        this.sizeValidate(name, 5) && 
        this.sizeValidate(dob, 6) && 
        this.sizeValidate(email, 5) && 
        this.sizeValidate(userType, 2) && 
        this.sizeValidate(gender, 3) && 
        this.sizeValidate(mobile, 8)){
          Alert.alert('Register','Successfully Registered');
        }
        else {
          Alert.alert('Register','Not successful');
        }
  }
  componentDidUpdate(props, state) {
    console.log( state);
  }
  render() {
    return (
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <KeyboardAwareScrollView>
          <Logo style={{marginTop: verticalScale(20)}} />
          <View style={{width: '90%', alignSelf: 'center'}}>
            <Input
              style={{marginTop: verticalScale(30)}}
              onChange={val => this.updateFields('name',val)}
              placeholder={'Name'}
              keyType={'default'}
              secure={false}
              logoType={'user'}
            />
            <Input
              style={{marginTop: verticalScale(20)}}
              placeholder={'Date of Birth'}
              onChange={val => this.updateFields('dob',val)}
              logoType={'calendar-day'}
              keyType={'number-pad'}
              dob={this.state.dob}
              masked={true}
            />
            <Input
              style={{marginTop: verticalScale(20)}}
              placeholder={'Mobile Number'}
              onChange={val => this.updateFields('mobile',val)}
              logoType={'phone'}
              keyType={'number-pad'}
            />
            <Input
              style={{marginTop: verticalScale(20)}}
              placeholder={'Email Address'}
              onChange={val => this.updateFields('email',val)}
              logoType={'at'}
              keyType={'email-address'}
            />
            <Input
              style={{marginTop: verticalScale(20)}}
              placeholder={'Password'}
              onChange={val => this.updateFields('pswd',val)}
              logoType={'lock'}
              keyType={'default'}
              secure={true}
            />
            <Input
              style={{marginTop: verticalScale(20)}}
              placeholder={'Re-enter Password'}
              onChange={val => this.updateFields('cnfpswd',val)}
              logoType={'lock'}
              keyType={'default'}
              secure={true}
            />
            <View style={{width: '100%', 
                    flexDirection:'row', 
                    marginTop: verticalScale(20)
                    }}>
            <Text style={{fontSize: 17, alignContent: 'center', color: COLORS.GREY,fontWeight:'700' }}>Gender : </Text>
            <View style={{alignItems: 'center', width: '70%', justifyContent:'flex-start'}}>
              <RadioGroup 
                  radioButtons={[{label:'Male', value: 'male',selected: false, color: COLORS.BLUE},{label:'Female', value:'female',selected: false, color: COLORS.BLUE}]} 
                  flexDirection='row'
                  onPress={val => this.updateChecks('gender',val)}
                  selected={false}
              />
            </View>
            </View>
            <View style={{width: '100%', 
                    flexDirection:'row', 
                    marginTop: verticalScale(20)
                    }}>
            <Text style={{fontSize: 17, alignContent: 'center', color: COLORS.GREY,fontWeight:'700'}}>User Type : </Text>
            <View style={{alignItems: 'center', width: '70%', justifyContent:'flex-start'}}>
            <RadioGroup 
                radioButtons={[{label:'Employee', value: 'emp',selected: false, color: COLORS.BLUE},{label:'Adminstrator', value: 'admin',selected: false, color: COLORS.BLUE}]} 
                flexDirection='row'
                onPress={val => this.updateChecks('userType',val)}
            />
            </View>
            </View>
            <KeyboardSpacer />
          </View>
          <View
            style={{
              marginTop: moderateScale(50),
              width: '100%',
              alignItems: 'center',
            }}>
            <TouchableHighlight
              onPress={this.register}
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
                {'Register'}
              </Text>
            </TouchableHighlight>
          </View>
          <View
            style={{
              justifyContent: 'center',
              marginTop: moderateScale(15),
              flexDirection: 'row',
              marginBottom: moderateScale(50)
            }}>
            <Text style={{color: COLORS.GREY, fontSize: moderateScale(14)}}>
              {'Already have an account ?'}
            </Text>
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate('Login')}>
              <Text style={{color: COLORS.BLUE, fontSize: moderateScale(14)}}>
                {' Login'}
              </Text>
            </TouchableHighlight>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
    );
  }
}

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
export {RegisterScreen};

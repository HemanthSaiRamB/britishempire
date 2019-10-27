import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TouchableHighlight,SafeAreaView, StatusBar } from 'react-native'
import { NavigationActions } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { COLORS } from './Colors';
import { scale, verticalScale } from '../helpers/scaler';
import {Logout} from '../redux/actions/userAction';
export default class DrawerContainer extends React.Component {

  render() {
    const { navigation } = this.props
    return (
      <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <View style={{height:verticalScale(130), width: '100%', flexDirection:'column', justifyContent:'center'}}>
        <Icon name={'users'} size={50} style={{alignSelf:'center', borderColor: COLORS.BLACK, borderRadius:100, borderWidth:2}} />
        <View style={{marginLeft:5,paddingLeft: 15, paddingVertical: 15}}>
            <Text style={{fontSize:scale(18), color: COLORS.BLACK, fontWeight:'700'}}>{'Harish S Venkat'}</Text>
            <Text style={{fontSize:scale(14), color: COLORS.BLACK, fontWeight:'700', paddingTop:10}}>{'Adminstrator'}</Text>
        </View>
      </View>
        <TouchableHighlight
         onPress={() => this.props.navigation.navigate('Home')}
          style={styles.uglyDrawerItem}>
          <View style={{flexDirection:'row',}}>
          <Icon name="home" size={18} color={COLORS.GOOGLE_RED} />
            <Text style={{fontSize: 18,fontWeight: 'bold',color:COLORS.GOOGLE_RED, marginLeft: scale(10)}}>Home Screen</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => Logout()} style={{flexDirection:'row',margin: 5,padding: 15,justifyContent:'flex-end', alignSelf:'flex-end', }}>
            <Text style={{fontSize: 18,fontWeight: 'bold',color: '#E73536'}}>Logout</Text>
        </TouchableHighlight>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    paddingTop: 40,
    paddingHorizontal: 20
  },
  uglyDrawerItem: {
    padding: 15,
    margin: 5,
    borderRadius: 2,
  }
})
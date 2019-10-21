import React, { Component } from 'react'
import {View, Text} from 'react-native';
import { COLORS } from '../app/Colors';
export default class HomeScreen extends Component{
    state = {
        usertype : '',
        action: ''
    }
    componentWillMount() {
        this.setState({
            usertype: this.props.navigation.getParam('usertype','none'),
            action: this.props.navigation.getParam('action','none')
        })
    }
    render(){
        return (
        <View style={{flex: 1, backgroundColor: COLORS.GOOGLE_RED, justifyContent:'center'}}>
            <Text style={{fontSize: 20, color: COLORS.WHITE, alignSelf:'center'}}>
                {this.state.usertype === 'emp' ? 'Hello Employee' : 'Hello Admin'}
            </Text>
        </View>
        );
    }
}
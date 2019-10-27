import React, { Component } from 'react'
import {View, Text} from 'react-native';
import { COLORS } from '../app/Colors';
import ThemeView from '../components/ThemeView';
import {DrawerActions} from 'react-navigation-drawer';
import Storage from '../app/storage';
export default class HomeScreen extends Component{
    state = {
        usertype : '',
        action: ''
    }
    componentWillMount() {
        this.setState({
            usertype: this.props.navigation.getParam('usertype','none'),
            action: this.props.navigation.getParam('action','none')
        });
        console.log("LOGGED IN ",Storage.getUser());
    }
    render(){
        return (
        <ThemeView 
                back 
                title={'British Empire'} 
                drawer={true}
                leftAction={() => this.props.navigation.dispatch(DrawerActions.toggleDrawer())}
                color={COLORS.GOOGLE_RED}>
            <View style={{flex: 1, backgroundColor: COLORS.FACEBOOK_BLUE}}>

            </View>
        </ThemeView>
        );
    }
}
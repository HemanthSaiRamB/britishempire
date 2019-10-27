import React,{Component} from 'react';
import {Dimensions, View, SafeAreaView, Text, StatusBar, Platform, Animated, TouchableHighlight} from 'react-native';
import { scale } from '../helpers/scaler';
import { COLORS } from '../app/Colors';
const { height: SCREEN_HEIGHT } = Dimensions.get("window");
import Icon from 'react-native-vector-icons/FontAwesome5';
import {DrawerActions} from 'react-navigation-drawer';
const IS_IPHONE_X = SCREEN_HEIGHT === 812;

export default class ThemeView extends Component {
    constructor(props){
        super(props);
    }
    LeftArea = () => {
        let {drawer, leftAction}  = this.props;
        let icon = drawer ? "bars" : "left";
        let drawerAction = () => leftAction();
        return (
            <TouchableHighlight onPress={() => drawer ? drawerAction() : leftAction()} 
                style={{position:'absolute', 
                left: 0, 
                top: 0,
                zIndex: 100, 
                marginTop:
      Platform.OS == "ios" ? (IS_IPHONE_X ? scale(40) : scale(40)) : scale(0)}}>
                    <Icon name={icon} size={18} style={{paddingRight: scale(4),
                paddingBottom: scale(4),
                paddingTop: scale(10),
                paddingLeft: scale(16)}} color={COLORS.BLACK} />
            </TouchableHighlight>
        );
    }
    CenterTitle = () => {
        let {title} = this.props;
        return (
            <View style={{
                height: IS_IPHONE_X ? scale(30) : scale(70),
                elevation: 2,
                shadowOpacity: 0.1,
                shadowRadius: scale(6),
                shadowOffset: {
                  height: 1,
                  width: 0
                },
                justifyContent: "center",
                alignItems: "center",
                paddingTop: Platform.OS == "ios" ? (IS_IPHONE_X ? scale(0) : scale(7)) : scale(20)
                }}>
                <Text style={{marginHorizontal: scale(5),
                              fontSize: scale(17),
                              color: COLORS.BLACK,
                              fontWeight: '500',
                              textAlign: "center"}}>
                    {title}
                </Text>
            </View>
        );
    }
    _isDarkTheme() {
        const { theme } = this.props;
        if (Platform.OS === "ios" && theme === "light") {
          return true;
        } else {
          return false;
        }
      }
  _renderStatusbar() {
    return this._isDarkTheme() ? (
      <StatusBar barStyle="dark-content" />
    ) : (
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="#0002"
        // translucent={true}
        />
      );
  }
    render(){
        let {back, title} = this.props;
        return (
            <SafeAreaView  style={{flex: 1}}>
                {this._renderStatusbar()}
                {back ? this.LeftArea(): () => {}}
                {title ? this.CenterTitle() : () => {}}
                <Animated.View style={{ flex: 1}}>
            {this.props.children}
            </Animated.View>
            </SafeAreaView>
        );
    }
}
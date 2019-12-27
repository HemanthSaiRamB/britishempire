/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {FAB, List, Colors, Portal} from 'react-native-paper';
import AppBar from '../components/AppBar';
import TrackInfo from '../components/TrackInfo';
import {PADetails} from './PADetails';
import {logoutAction} from '../redux/Actions/user';

export default class HomeScreen extends Component {
  state = {
    raiseTicket: false,
    visible: false,
    Details: 0,
    list: [{}, {}, {}],
  };
  static navigationOptions = {
    header: null,
  };
  logout = () => {
    logoutAction();
  };
  hideMenu = () => {
    console.log('Hide');
    this.setState({raiseTicket: false, Details: 0});
  };
  componentDidUpdate(props, state) {
    console.log(state, props);
  }
  showMenu = () => this.setState({raiseTicket: true});
  render() {
    return (
      <>
        <AppBar action={this.logout} />
        <View style={{backgroundColor: '#aabcff', flex: 1}}>
          <TrackInfo total={50} completed={30} pending={20} />
          <PADetails
            visible={this.state.Details === 1}
            hideModal={this.hideMenu}
          />
          <List.Section>
            <FlatList
              data={this.state.list}
              ItemSeparatorComponent={() => (
                <View style={{height: 10, width: '100%'}} />
              )}
              keyExtractor={(item, index) => index.toString()}
              renderItem={() => (
                <List.Item
                  title="Ravi Kiran"
                  description="Propane Appliance - 1234"
                  right={props => (
                    <List.Icon
                      color={Colors.green800}
                      {...props}
                      icon="check-outline"
                    />
                  )}
                />
              )}
            />
          </List.Section>
          <Portal>
            <FAB.Group
              large
              icon="plus"
              open={this.state.raiseTicket}
              loading={this.state.raiseTicket}
              label={'Add Ticket'}
              actions={[
                {
                  label: 'Propane Appliance',
                  icon: 'gas-station',
                  onPress: () =>
                    this.setState({Details: 1, raiseTicket: false}),
                },
                {
                  label: 'Oil Appliance',
                  icon: 'oil',
                  onPress: () =>
                    this.setState({Details: 2, raiseTicket: false}),
                },
              ]}
              onStateChange={({open}) => this.setState({raiseTicket: open})}
            />
          </Portal>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

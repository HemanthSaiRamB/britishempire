/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { FAB, List, Colors, Portal, Subheading } from "react-native-paper";
import AppBar from "../components/AppBar";
import TrackInfo from "../components/TrackInfo";
import { PADetails } from "./PADetails";
import { logoutAction } from "../redux/Actions/user";
import { OADetails } from "./OADetails";
import AsyncStorage from "@react-native-community/async-storage";
import { connect } from "react-redux";
import {
  getCount,
  getWorkOrder,
  addPropaneAppliance,
  addOilAppliance,
  getSingleWorkOrder
} from "../redux/Actions/tickets";
import {propane} from './../redux/propaneStore';
import {oil} from './../redux/oilStore';
import { PROPANE, OIL } from "../redux/actionTypes";
class Home extends Component {
  state = {
    raiseTicket: false,
    visible: false,
    propaneReset: true,
    oilReset: true,
    type: "err",
    list: [],
    active: 1,
    total: 0,
    pending: 0,
    completed: 0,
    todo: 0,
    Details: 0
  };
  constructor(props) {
    super(props);
    console.log(props);
  }
  static navigationOptions = {
    header: null
  };
  logout = () => {
    logoutAction();
  };
  getOrdersProOil = async status => {
    await getWorkOrder("pro", status)
      .then(res => {
        this.setState({
          list: [...this.state.list, ...res]
        });
      })
      .catch(err => console.log("Pro details ", err));
    await getWorkOrder("oil", status)
      .then(res => {
        this.setState({
          list: [...this.state.list, ...res]
        });
      })
      .catch(err => console.log("OIL details ", err));
  };
  activeAction = status => {
    this.setState({
      active: status,
      list: []
    });
    this.getOrdersProOil(status);
  };

  hideMenu = () => {
    console.log("Hide");
    this.getStatusData();
    this.setState({ raiseTicket: false, Details: 0, propaneReset: true });
  };
  async getUserType() {
    const userType = await AsyncStorage.getItem("userType");
    return userType;
  }

  getStatusData() {
    getCount()
      .then(res => {
        console.log(res);
        this.setState({
          ...this.state,
          total: res.totalWorkOrders,
          pending: res.pending,
          completed: res.completed,
          todo: res.todo
        });
      })
      .catch(err => this.setState({ completed: "-" }));
  }

  async componentDidMount() {
    await this.getStatusData();
    await this.getOrdersProOil(1);
    this.getUserType()
      .then(res =>
        this.setState({
          type: res
        })
      )
      .catch(err =>
        this.setState({
          type: "err"
        })
      );
  }
  updateCall = async () => {
    await this.getStatusData();
  };
  openActiveItem(index) {
    let { addPropane, addOil } = this.props;
    function action(number, data){
        console.log("ACTIVE DTAA", data);
      if(number === 1){
        getSingleWorkOrder("pro", data?._id)
        .then(res => {
          console.log("PRO DATA RECIEVED : ", )
          addPropane(res[0])
        })
        .catch(err => console.log(err))
      }else {
        getSingleWorkOrder("oil", data?._id)
        .then(res => {
          console.log("OIL DATA RECIEVED : ", res[0])
          addOil(res[0])
        })
        .catch(err => console.log(err))
      }
      return number;
    }
    console.log("DATA :::: ",this.state.list[index]);
    let order = this.state.list[index]["workOrderId"];
    let details = new String(order).charAt(0) === "P" ? action(1, this.state.list[index]) : action(2, this.state.list[index]);
    this.setState({ activeItem: index, Details: details });
  }

  showMenu = () => this.setState({ raiseTicket: true });
  render() {
    return (
      <>
        <AppBar profile={() => alert("opening")} action={this.logout} />
        <View style={{ backgroundColor: "#aabcff", flex: 1 }}>
          <TrackInfo
            total={this.state.total}
            action={this.activeAction}
            active={this.state.active}
            completed={this.state.completed}
            pending={this.state.pending}
            todos={this.state.todo}
          />
          <PADetails
            visible={this.state.Details === 1}
            type={this.state.type}
            onUpdate={this.updateCall}
            reset={this.state.propaneReset}
            hideModal={this.hideMenu}
          />
          <OADetails
            visible={this.state.Details == 2}
            reset={this.state.oilReset}
            type={this.state.type}
            hideModal={this.hideMenu}
          />
          <View
            style={{flex:1}} >
            {this.state.list.length ? (
              <FlatList
                data={this.state.list}
                ItemSeparatorComponent={() => (
                  <View style={{ height: 10, width: "100%" }} />
                )}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <List.Item
                    title={`WorkOrder Id : ${item.workOrderId} - ${item.date}`}
                    description={`Customer Account No : ${item.accNo}`}
                    onPress={() => this.openActiveItem(index)}
                    right={props => (
                      <List.Icon
                        color={Colors.green800}
                        {...props}
                        icon="pencil"
                      />
                    )}
                  />
                )}
              />
            ) : (
              <View>
                <Subheading style={{ textAlign: "center" }}>
                  No records
                </Subheading>
              </View>
            )}
          </View>
          <Portal>
            {this.state.type === "admin" && (
              <FAB.Group
                large
                icon="plus"
                open={this.state.raiseTicket}
                loading={this.state.raiseTicket}
                label={"Add Ticket"}
                actions={[
                  {
                    label: "Propane Appliance",
                    icon: "gas-station",
                    onPress: async () =>{
                      await this.props.addPropane(propane.ComprehensivePropaneInspection);
                      this.setState({ Details: 1, raiseTicket: false, propaneReset: true })
                  }},
                  {
                    label: "Oil Appliance",
                    icon: "oil",
                    onPress: async () =>{
                      await this.props.addOil(oil.ComprehensiveOilInspection);
                      this.setState({ Details: 2, raiseTicket: false, oilReset: true })

                  }}
                ]}
                onStateChange={({ open }) =>
                  this.setState({ raiseTicket: open })
                }
              />
            )}
          </Portal>
        </View>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => ({
  addPropane: data => dispatch({ type: PROPANE, data }),
  addOil: data => dispatch({ type: OIL, data }),
});

const HomeScreen = connect(null, mapDispatchToProps)(Home);

export default HomeScreen;

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0
  }
});

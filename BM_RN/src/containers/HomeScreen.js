/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import {
  FAB,
  List,
  Colors,
  Portal,
  Subheading,
  Title,
  Card,
  Modal,
  Paragraph
} from "react-native-paper";
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
import { propane } from "./../redux/propaneStore";
import { oil } from "./../redux/oilStore";
import { PROPANE, OIL } from "../redux/actionTypes";

const Detail = props => {
  let name = props?.name;
  let value = props?.value;
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Subheading>{name}</Subheading>
      <Subheading>{value}</Subheading>
    </View>
  );
};
export default class Home extends Component {
  state = {
    raiseTicket: false,
    visible: false,
    propaneReset: true,
    profile: false,
    oilReset: true,
    type: "err",
    list: [],
    propane: null,
    oil: null,
    active: 1,
    userName: "",
    userEmail: "",
    userAge: "",
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
    this.setState({
      raiseTicket: false,
      Details: 0,
      propaneReset: true,
      propane: null,
      oil: null
    });
  };
  async getUserType() {
    return await AsyncStorage.getItem("userType");
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
    this.setState({
      userName: await AsyncStorage.getItem("userName"),
      userEmail: await AsyncStorage.getItem("userEmail"),
      userAge: await AsyncStorage.getItem("userAge"),
      userType: await AsyncStorage.getItem("userType")
    });
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
    var updateId = (type, value) => {
      this.setState({
        [type]: value
      });
    };
    function action(number, data) {
      console.log("ACTIVE DTAA", data);
      if (number === 1) {
        updateId("propane", data._id);
      } else {
        updateId("oil", data._id);
      }
      return number;
    }
    console.log("DATA :::: ", this.state.list[index]);
    let order = this.state.list[index]["workOrderId"];
    let details =
      new String(order).charAt(0) === "P"
        ? action(1, this.state.list[index])
        : action(2, this.state.list[index]);
    this.setState({ activeItem: index, Details: details });
  }
  getUserDetailMessage = () => {
    return `Hello  ${this.state.userType === "emp" ? "Employee" : "Admin"}`;
  };

  showMenu = () => this.setState({ raiseTicket: true });
  render() {
    return (
      <>
        <AppBar
          profile={() => this.setState({ profile: true })}
          action={this.logout}
        />
        <View style={{ backgroundColor: "#aabcff", flex: 1 }}>
          <TrackInfo
            total={this.state.total}
            action={this.activeAction}
            active={this.state.active}
            completed={this.state.completed}
            pending={this.state.pending}
            todos={this.state.todo}
          />
          {this.state.Details === 1 && this.state.propane != null ? (
            <PADetails
              visible={this.state.Details === 1}
              type={this.state.type}
              onUpdate={this.updateCall}
              data={this.state.propane}
              reset={this.state.propaneReset}
              hideModal={this.hideMenu}
            />
          ) : this.state.Details === 2 && this.state.oil != null ? (
            <OADetails
              visible={this.state.Details == 2}
              reset={this.state.oilReset}
              type={this.state.type}
              onUpdate={this.updateCall}
              data={this.state.oil}
              hideModal={this.hideMenu}
            />
          ) : (
            <View />
          )}
          {this.state.profile && (
            <Portal>
              <Modal
                dismissable={true}
                visible={this.state.profile}
                onDismiss={() => this.setState({ profile: false })}
              >
                <View style={{ width: "70%", alignSelf: "center" }}>
                  <Card>
                    <Title style={styles.selfCenter}>{"Profile Details"}</Title>
                    <Card.Content>
                      <Title style={styles.selfCenter}>
                        {this.getUserDetailMessage()}
                      </Title>
                      <Detail name={"Name"} value={this.state.userName} />
                      <Detail name={"Email"} value={this.state.userEmail} />
                      <Detail name={"Age"} value={this.state.userAge} />
                    </Card.Content>
                  </Card>
                </View>
              </Modal>
            </Portal>
          )}

          <View style={{ flex: 1 }}>
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
                    onPress: async () => {
                      this.setState({
                        propane: "new",
                        Details: 1,
                        raiseTicket: false,
                        propaneReset: true
                      });
                    }
                  },
                  {
                    label: "Oil Appliance",
                    icon: "oil",
                    onPress: () => {
                      this.setState({
                        oil: "new",
                        Details: 2,
                        raiseTicket: false,
                        oilReset: true
                      });
                    }
                  }
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

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0
  },
  selfCenter: {
    alignSelf: "center"
  }
});

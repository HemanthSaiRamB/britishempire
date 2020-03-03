import React, { Component } from "react";
import {
  Portal,
  Modal,
  TextInput,
  Card,
  Title,
  ProgressBar,
  Colors,
  Button,
  ActivityIndicator,
  Paragraph,
  Switch,
  IconButton,
  Subheading,
  RadioButton,
  List
} from "react-native-paper";
import { scale, verticalScale, moderateScale } from "../helpers/scaler";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { Dropdown } from "react-native-material-dropdown";
import { connect } from "react-redux";
import _ from "lodash";
import { AirbnbRating } from "react-native-ratings";
import {
  getAccountDtls,
  getApplianceType,
  getManufacturer,
  getModelNo,
  getSerialNo,
  submitTicket,
  getFilterSize,
  getAllEmployees,
  getEmpDetails
} from "../redux/Actions/tickets";
import AsyncStorage from "@react-native-community/async-storage";

class PADetailsScreen extends Component {
  defaultState = {
    progress: 0.01,
    step: 2,
    type: 0,
    user: "err",
    aField: "accNo",
    error: false,
    // answers
    data: {},
    local: {
      progress: true,
      accSearch: [],
      empSearch: [],
      applncType: [],
      isDisabled: false,
      manuf: [],
      airFilterSize: [],
      serialNo: [],
      modelNo: [],
      BTUH: []
    }
  };
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    header: null
  };
  state = this.defaultState;
  async UNSAFE_componentWillReceiveProps(props, state) {
    console.log("R-Props : ", props, state);
    if (props?.reset) {
      console.log("RESETTING STATE");
      await this.setState({
        ...this.defaultState,
        data: { ...props?.propane?.ComprehensivePropaneInspection },
        local: {
          ...this.state.local,
          isDisabled:
            props?.propane?.ComprehensivePropaneInspection.status == "completed"
              ? true
              : false
        }
      });
    }
    this.state.data.accNo &&
      getAccountDtls(null, this.state.data.accNo)
        .then(res => {
          this.setState({
            local: {
              ...this?.state?.local,
              accNo: res[0]?.value
            }
          });
          console.log("acc update", res);
        })
        .catch(err => console.log("acc update err ", err));
    this.state.data.empId &&
      getEmpDetails(this.state.data.empId)
        .then(res => {
          console.log("emp update", res);
          this.setState({
            local: {
              ...this?.state?.local,
              empName: res.name
            }
          });
        })
        .catch(err => console.log("emp update err ", err));
  }

  componentWillMount() {
    if (this?.props?.reset) {
      this.setState({
        ...this.defaultState,
        data: { ...this.props.propane.ComprehensivePropaneInspection }
      });
    }
  }

  async componentDidMount() {
    console.log("PADetails Mounted");
    this.setState({
      user: await AsyncStorage.getItem("userType")
    });
    if (
      _.isEmpty(this?.state?.local?.manuf) &&
      !_.isUndefined(this?.state?.local?.applncType)
    ) {
      getApplianceType()
        .then(res => {
          console.log("RES APPLIANCE : ", res);
          this.setState({
            local: {
              ...this?.state?.local,
              applncType: res
            }
          });
        })
        .catch(err => {
          console.log("ERR : ", err);
        });
    }
  }
  shallowEqual(objA, objB) {
    if (objA === objB) {
      return true;
    }

    if (
      typeof objA !== "object" ||
      objA === null ||
      typeof objB !== "object" ||
      objB === null
    ) {
      return false;
    }

    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
      return false;
    }

    // Test for A's keys different from B.
    var bHasOwnProperty = hasOwnProperty.bind(objB);
    for (var i = 0; i < keysA.length; i++) {
      if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
        return false;
      }
    }
    return true;
  }
  shallowCompare(instance, nextProps, nextState) {
    return (
      !this.shallowEqual(instance.props, nextProps) ||
      !this.shallowEqual(instance.state, nextState)
    );
  }

  _progress() {
    let { step } = this.state;
    let progress = step / 11;
    let color = Colors.red100;
    switch (step) {
      case 1:
        return { progress, color: Colors.red100 };
      case 2:
        return { progress, color: Colors.red500 };
      case 3:
        return { progress, color: Colors.red900 };
      case 4:
        return { progress, color: Colors.orange100 };
      case 5:
        return { progress, color: Colors.orange500 };
      case 6:
        return { progress, color: Colors.orange900 };
      case 7:
        return { progress, color: Colors.green100 };
      case 8:
        return { progress, color: Colors.green500 };
      case 9:
        return { progress, color: Colors.green900 };
      case 10:
        return { progress, color: Colors.greenA700 };
      case 11:
        return { progress, color: Colors.lightGreen900 };
      default:
        return { progress, color };
    }
  }
  $accountNumber = () => {
    let { accNo, empId, empName, isDisabled } = this?.state?.local;
    let { priority, comment } = this?.state?.data;
    let accountSearch = input => {
      getAccountDtls(input, null)
        .then(async res => {
          this.setState({
            local: {
              ...this.state.local,
              accSearch: await res
            }
          });
        })
        .catch(err => {
          console.log("Error in acc", err);
        });
      this.setState({
        local: {
          ...this.state.local,
          accNo: input
        }
      });
    };

    let employeeSearch = input => {
      getAllEmployees(input)
        .then(async res => {
          this.setState({
            local: {
              ...this.state.local,
              empSearch: await res
            }
          });
        })
        .catch(err => {
          console.log("Error in emp", err);
        });
      this.setState({
        local: {
          ...this.state.local,
          empId: input,
          empName: input
        }
      });
    };
    let activeThisValue = (input, id) => {
      this.setState({
        data: {
          ...this.state.data,
          accNo: id
        },
        local: {
          ...this.state.local,
          accNo: input
        }
      });
    };
    let activeEmpValue = (input, id) => {
      this.setState({
        data: {
          ...this.state.data,
          empId: id
        },
        local: {
          ...this.state.local,
          empId: input
        }
      });
    };
    let submitTicketNow = () => {
      submitTicket("propane", null, this.state.data)
        .then(res => {
          this.setState({
            step: 12,
            local: {
              ...this.state.local,
              progress: false,
              create_id: res._id,
              create_workId: res.workOrderId
            }
          });
          console.log("Data: ", res, this.props);
          this.props.onUpdate();
        })
        .catch(err => {
          console.log("Error: ", err);
        });
    };
    let getPriority = () => {
      var prior = priority;
      return prior + " Priority";
    };
    let setComPriority = (type, value) => {
      this.setState({
        data: {
          ...this?.state?.data,
          [type]: value
        }
      });
    };
    return (
      <>
        {this?.props?.type !== "admin" && (
          <View style={{ position: "absolute", right: 15, top: 15 }}>
            <Subheading>{getPriority()}</Subheading>
          </View>
        )}
        <Card.Title title="Enter Account number" subtitle="Create Ticket" />
        <Card.Content>
          <TextInput
            label="Account Number"
            mode="outlined"
            disabled={isDisabled}
            value={accNo}
            onFocus={() => this.setState({ aField: "accNo" })}
            onChangeText={text => accountSearch(text)}
          />
          {!_.isEmpty(this?.state?.local?.accSearch) &&
          this?.state?.aField === "accNo" ? (
            <FlatList
              style={styles?.accNumList}
              data={this?.state?.local?.accSearch}
              renderItem={({ item }) => {
                return (
                  <List.Item
                    title={item?.value ? item?.value : ""}
                    onPress={() => activeThisValue(item?.value, item?.id)}
                    description={`${item.name} - ${item.address}`}
                  />
                );
              }}
              keyExtractor={(item, index) => index?.toString()}
            />
          ) : (
            <View />
          )}
          {this?.props?.type === "admin" && (
            <>
              <TextInput
                label="All Employee"
                mode="outlined"
                disabled={isDisabled}
                value={empId}
                onFocus={() => this.setState({ aField: "emp" })}
                onChangeText={text => employeeSearch(text)}
              />
              {!_.isEmpty(this.state.local.empSearch) &&
              this.state.aField === "emp" ? (
                <FlatList
                  style={styles.accNumList}
                  data={this.state.local.empSearch}
                  renderItem={({ item }) => {
                    return (
                      <List.Item
                        title={item.value ? item.value : ""}
                        onPress={() => activeEmpValue(item.value, item.id)}
                        description={`${item.mobilenumber} - ${item.email}`}
                      />
                    );
                  }}
                  keyExtractor={(item, index) => index.toString()}
                />
              ) : (
                <View />
              )}
              <TextInput
                label="Comment"
                mode="outlined"
                multiline
                disabled={isDisabled}
                numberOfLines={3}
                value={comment}
                onChangeText={text => setComPriority("comment", text)}
              />
              <Dropdown
                value={priority}
                title={"Application Priority"}
                disabled={isDisabled}
                onChangeText={val => setComPriority("priority", val)}
                data={[
                  { id: "Low", value: "Low" },
                  { id: "Medium", value: "Medium" },
                  { id: "High", value: "High" }
                ]}
              />
            </>
          )}
        </Card.Content>
        <Card.Actions>
          {_.isEmpty(this.state.data.accNo) ? (
            <Subheading style={styles.accNumActionCenter}>
              Add Any Account Detail and Select to
            </Subheading>
          ) : (
            <>
              {this.props.type === "emp" ||
              this.state.data.status === "completed" ? (
                <Button
                  style={{ alignSelf: "flex-end" }}
                  onPress={() => this.setState({ step: 3 })}
                  mode="outlined"
                  icon="check"
                >
                  {"Proceed"}
                </Button>
              ) : (
                <Button
                  style={{ alignSelf: "flex-end" }}
                  onPress={() => submitTicketNow()}
                  mode="outlined"
                  icon="check"
                >
                  {"Submit Ticket"}
                </Button>
              )}
            </>
          )}
        </Card.Actions>
      </>
    );
  };
  $loading = () => {
    return <ActivityIndicator animating={true} color={Colors.red800} />;
  };
  $applianceDetails = () => {
    let {
      applncType,
      manuf,
      modelNo,
      serialNo,
      BTUH,
      airFilterSize
    } = this.state.data.propaneApplianceDetails;
    let { isDisabled } = this.state.local;
    let { error } = this.state;
    let update = async (type, i, data) => {
      console.log(JSON.stringify(data));
      let _id = data[i] ? data[i] : "";
      console.log("ID of : ", _id);
      this.setState({
        data: {
          ...this.state.data,
          propaneApplianceDetails: {
            ...this.state.data.propaneApplianceDetails,
            [type]: _id
          }
        }
      });
      let setData = (listType, data) => {
        console.log("RESSSS : ", listType, data);
        this.setState({
          ...this.state,
          local: {
            ...this.state.local,
            [listType]: [...data]
          }
        });
      };
      getFilterSize()
        .then(res => setData("airFilterSize", res))
        .catch(err => {
          console.log("Error : ", err);
        });

      if (type === "applncType") {
        getManufacturer(_id)
          .then(res => setData("manuf", res))
          .catch(err => {
            console.log("Error : ", err);
          });
      } else if (type === "manuf") {
        getModelNo(_id)
          .then(res => setData("modelNo", res))
          .catch(err => {
            console.log("Error : ", err);
          });
      } else if (type === "modelNo") {
        getSerialNo(_id)
          .then(res => setData("serialNo", res))
          .catch(err => {
            console.log("Error : ", err);
          });
      } else if (type === "serialNo") {
      }
    };
    let validator = () => {
      if (
        !_.isEmpty(applncType) &&
        !_.isEmpty(manuf) &&
        !_.isEmpty(modelNo) &&
        !_.isEmpty(serialNo)
      ) {
        this.setState({ step: 4, error: false });
      } else {
        this.setState({ error: true });
      }
    };
    return (
      <>
        <Title style={{ alignSelf: "center" }}>{"Appliance Details"}</Title>
        <Card>
          <Card.Content
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View style={{ flex: 1 }}>
              <Dropdown
                dropdownOffset={{ top: 0, left: 0 }}
                title="Appliance Type"
                disabled={isDisabled}
                value={!_.isUndefined(applncType.value) ? applncType.value : ""}
                onChangeText={(value, index, data) =>
                  update("applncType", index, data)
                }
                data={this.state.local.applncType}
              />
              <Dropdown
                dropdownOffset={{ top: 0, left: 0 }}
                title="Manufacturer"
                disabled={isDisabled}
                value={!_.isUndefined(manuf.value) ? manuf.value : ""}
                onChangeText={(value, index, data) =>
                  update("manuf", index, data)
                }
                data={this.state.local.manuf}
              />
              <Dropdown
                dropdownOffset={{ top: 0, left: 0 }}
                title="Modal No."
                disabled={isDisabled}
                value={!_.isUndefined(modelNo.value) ? modelNo.value : ""}
                onChangeText={(value, index, data) =>
                  update("modelNo", index, data)
                }
                data={this.state.local.modelNo}
              />
              <Dropdown
                dropdownOffset={{ top: 0, left: 0 }}
                title="Serial No."
                disabled={isDisabled}
                value={!_.isUndefined(serialNo.value) ? serialNo.value : ""}
                onChangeText={(value, index, data) =>
                  update("serialNo", index, data)
                }
                data={this.state.local.serialNo}
              />
              <Dropdown
                dropdownOffset={{ top: 0, left: 0 }}
                title="BTU/H"
                disabled={isDisabled}
                value={!_.isUndefined(BTUH.value) ? BTUH.value : ""}
                onChangeText={(value, index, data) =>
                  update("BTUH", index, data)
                }
                data={this.state.local.BTUH}
              />
              <Dropdown
                dropdownOffset={{ top: 0, left: 0, bottom: 32 }}
                title="Air Filter Size"
                disabled={isDisabled}
                value={
                  !_.isUndefined(airFilterSize.value) ? airFilterSize.value : ""
                }
                onChangeText={(value, index, data) =>
                  update("airFilterSize", index, data)
                }
                data={this.state.local.airFilterSize}
              />
            </View>
          </Card.Content>
          <Card.Actions>
            <Paragraph style={{ color: error ? Colors.red900 : Colors.black }}>
              Select All the fields to{" "}
            </Paragraph>
            <Button
              style={{ alignSelf: "flex-end" }}
              onPress={() => validator()}
              icon="chevron-right"
            >
              {"Proceed"}
            </Button>
          </Card.Actions>
        </Card>
      </>
    );
  };
  $applianceChecks = () => {
    let {
      check1,
      check2,
      check3,
      check4,
      check5,
      check6,
      check7
    } = this?.state?.data?.propaneApplianceDetails?.applianceNoCheckList;
    let { isDisabled } = this.state.local;
    let validator = (type, value) => {
      this.setState({
        data: {
          ...this.state.data,
          propaneApplianceDetails: {
            ...this.state.data.propaneApplianceDetails,
            applianceNoCheckList: {
              ...this.state.data.propaneApplianceDetails.applianceNoCheckList,
              [type]: value
            }
          }
        }
      });
    };
    return (
      <>
        <Title style={{ alignSelf: "center" }}>
          {"Appliance Condition Checks"}
        </Title>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: scale(1),
                paddingVertical: verticalScale(5)
              }}
            >
              <Subheading style={{ paddingHorizontal: scale(1), fontSize: 17 }}>
                {
                  "APPLIANCE APPROVED & INSTALLED IN \nACCORDANCE WITH THE INSTALLATION \nCODE/MANUFACTURERS CERTIFIED INSTRUCTIONS"
                }
              </Subheading>
              <Switch
                style={{ position: "absolute", right: 0 }}
                value={check1}
                disabled={isDisabled}
                onValueChange={() => validator("check1", !check1)}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: scale(1),
                paddingVertical: verticalScale(5)
              }}
            >
              <Subheading style={{ paddingHorizontal: scale(1), fontSize: 17 }}>
                {
                  'APPLIANCE CONVERSION COMPLETED - MANIFOLD \n____ "WC INLET ____ "WC(GAS PRESSURES SET, APPROPRIATE LABELLING AFFIXED TO APPLIANCE, ETC.)'
                }
              </Subheading>
              <Switch
                style={{ position: "absolute", right: 0 }}
                value={check2}
                disabled={isDisabled}
                onValueChange={() => validator("check2", !check2)}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: scale(1),
                paddingVertical: verticalScale(5)
              }}
            >
              <Subheading style={{ paddingHorizontal: scale(1), fontSize: 17 }}>
                {
                  "VENTING COMPLETE & INSTALLED INACCORDANCE \nWITH INSTALLATION CODE/MAN. CERTIFIED INSTRUCTIONS (CLEARANCES, RUN LENGTH,\n PROPERLY DRAINED, ETC.)"
                }
              </Subheading>
              <Switch
                style={{ position: "absolute", right: 0 }}
                value={check3}
                disabled={isDisabled}
                onValueChange={() => validator("check3", !check3)}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: scale(1),
                paddingVertical: verticalScale(5)
              }}
            >
              <Subheading style={{ paddingHorizontal: scale(1), fontSize: 17 }}>
                {
                  "INSTALLATION COMPLIANT WITH PROPANE STORAGE \n& HANDLING CODE (CLEARENCES- IGNITION/INTAKE/EXHAUST, ETC.)"
                }
              </Subheading>
              <Switch
                style={{ position: "absolute", right: 0 }}
                value={check4}
                disabled={isDisabled}
                onValueChange={() => validator("check4", !check4)}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: scale(1),
                paddingVertical: verticalScale(5)
              }}
            >
              <Subheading style={{ paddingHorizontal: scale(1), fontSize: 17 }}>
                {
                  "GAS LINES & PIPING INSTALLED IN ACCORDANCE \nWITH INSTALLATION CODE (IDENTIFIED, BONDED, \nPAINTED, ETC.)"
                }
              </Subheading>
              <Switch
                style={{ position: "absolute", right: 0 }}
                value={check5}
                disabled={isDisabled}
                onValueChange={() => validator("check5", !check5)}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: scale(1),
                paddingVertical: verticalScale(5)
              }}
            >
              <Subheading style={{ paddingHorizontal: scale(1), fontSize: 17 }}>
                {
                  "APPLIANCE DRAINED/DRAIN LINES (IF \nAPPLICABLE) INSTALLED IN ACCORDANCE WITH MANUFACTURERS CERTIFIED \nINSTRUCTIONS"
                }
              </Subheading>
              <Switch
                style={{ position: "absolute", right: 0 }}
                value={check6}
                disabled={isDisabled}
                onValueChange={() => validator("check6", !check6)}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: scale(1),
                paddingVertical: verticalScale(5)
              }}
            >
              <Subheading style={{ paddingHorizontal: scale(1), fontSize: 17 }}>
                {
                  "SYSTEM APPROPRIATELY TAGGED WITH A PRESSURE \nTEST TAG AFFIXED TO THE SYSTEM"
                }
              </Subheading>
              <Switch
                style={{ position: "absolute", right: 0 }}
                value={check7}
                disabled={isDisabled}
                onValueChange={() => validator("check7", !check7)}
              />
            </View>
          </Card.Content>
          <Card.Actions>
            <Subheading>{"Select all fields to"}</Subheading>
            <Button
              style={{ alignSelf: "flex-end" }}
              onPress={() => this.setState({ step: 5 })}
              icon="chevron-right"
            >
              {"Proceed"}
            </Button>
          </Card.Actions>
        </Card>
      </>
    );
  };
  $propaneStorageDetails = () => {
    let {
      check1,
      check2,
      check3,
      check4,
      check5
    } = this?.state?.data?.propaneStorageDetails?.checkList;
    let { isDisabled } = this.state.local;

    let validator = (type, value) => {
      console.log("values is : ", { [type]: value });
      console.log(
        "value: ",
        this?.state?.data?.propaneStorageDetails?.checkList[type]
      );
      this.setState({
        data: {
          ...this?.state?.data,
          propaneStorageDetails: {
            ...this?.state?.data?.propaneStorageDetails,
            checkList: {
              ...this?.state?.data?.propaneStorageDetails?.checkList,
              [type]: value
            }
          }
        }
      });
    };

    return (
      <>
        <Title style={{ alignSelf: "center" }}>
          {"COMPREHENSIVE PROPANE INSPECTION"}
        </Title>
        <Paragraph style={{ alignSelf: "center" }}>
          {"PROPANE STORAGE DETAILS"}
        </Paragraph>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: scale(1),
                paddingVertical: verticalScale(5)
              }}
            >
              <Subheading style={{ paddingHorizontal: scale(1), fontSize: 17 }}>
                {
                  "TANK/CYLINDER OVERALL CONDITION ACCEPTABLE \n(BASE/FOOTING, LEVEL, PROTECTIVE LID, \nGAUGE, ETC.)"
                }
              </Subheading>
              <Switch
                style={{ position: "absolute", right: 0 }}
                value={check1}
                disabled={isDisabled}
                onValueChange={() => validator("check1", !check1)}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: scale(1),
                paddingVertical: verticalScale(5)
              }}
            >
              <Subheading style={{ paddingHorizontal: scale(1), fontSize: 17 }}>
                {
                  "TANKS/CYLINDER INSTALLED INCOMPLIANCE (CLEARANCES, PROTECTION, ETC.)"
                }
              </Subheading>
              <Switch
                style={{ position: "absolute", right: 0 }}
                value={check2}
                disabled={isDisabled}
                onValueChange={() => validator("check2", !check2)}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: scale(1),
                paddingVertical: verticalScale(5)
              }}
            >
              <Subheading style={{ paddingHorizontal: scale(1), fontSize: 17 }}>
                {
                  "SERVICE VALVES, RELIEF & FILLER VALVES \nOPERATIONAL/ACCEPTABLE CONDITION (BACKCHECK VALVE ABSENT, ETC.)"
                }
              </Subheading>
              <Switch
                style={{ position: "absolute", right: 0 }}
                value={check3}
                disabled={isDisabled}
                onValueChange={() => validator("check3", !check3)}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: scale(1),
                paddingVertical: verticalScale(5)
              }}
            >
              <Subheading style={{ paddingHorizontal: scale(1), fontSize: 17 }}>
                {"COMPANY IDENTIFICATION INSTALLED ON \nTANK/CYLINDER"}
              </Subheading>
              <Switch
                style={{ position: "absolute", right: 0 }}
                value={check4}
                disabled={isDisabled}
                onValueChange={() => validator("check4", !check4)}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: scale(1),
                paddingVertical: verticalScale(5)
              }}
            >
              <Subheading style={{ paddingHorizontal: scale(1), fontSize: 17 }}>
                {
                  "TANK/CYLINDER VALVES, ASSOCIATED REGULATORS \n& CONNECTION MATERIAL FREE OF LEAKS"
                }
              </Subheading>
              <Switch
                style={{ position: "absolute", right: 0 }}
                value={check5}
                disabled={isDisabled}
                onValueChange={() => validator("check5", !check5)}
              />
            </View>
          </Card.Content>
          <Card.Actions>
            <Subheading>{"Select all fields to"}</Subheading>
            <Button
              style={{ alignSelf: "flex-end" }}
              onPress={() => this.setState({ step: 8 })}
              icon="chevron-right"
            >
              {"Proceed"}
            </Button>
          </Card.Actions>
        </Card>
      </>
    );
  };
  $propaneStorageDetailsExtra = () => {
    let {
      serialNo,
      cylinder,
      tank,
      manufacturer,
      reconDate
    } = this?.state?.data?.propaneStorageDetails;
    let { isDisabled } = this.state.local;

    let validator = (type, value) => {
      this.setState({
        data: {
          ...this?.state?.data,
          propaneStorageDetails: {
            ...this?.state?.data?.propaneStorageDetails,
            [type]: value
          }
        }
      });
    };
    return (
      <>
        <Title style={{ alignSelf: "center" }}>
          {"COMPREHENSIVE PROPANE INSPECTION"}
        </Title>
        <Paragraph style={{ alignSelf: "center" }}>
          {"PROPANE STORAGE Extra DETAILS"}
        </Paragraph>
        <Card>
          <Card.Content>
            <TextInput
              style={{ height: 45, paddingVertical: verticalScale(3) }}
              label="SERIAL No"
              mode="outlined"
              disabled={isDisabled}
              value={serialNo}
              onChangeText={text => validator("serialNo", text)}
            />
            <TextInput
              style={{ height: 45, paddingVertical: verticalScale(3) }}
              label="CYLINDER"
              mode="outlined"
              disabled={isDisabled}
              value={cylinder}
              onChangeText={text => validator("cylinder", text)}
            />
            <TextInput
              style={{ height: 45, paddingVertical: verticalScale(3) }}
              label="TANK"
              mode="outlined"
              disabled={isDisabled}
              value={tank}
              onChangeText={text => validator("tank", text)}
            />
            <TextInput
              style={{ height: 45, paddingVertical: verticalScale(3) }}
              label="MANUFACTURER"
              mode="outlined"
              disabled={isDisabled}
              value={manufacturer}
              onChangeText={text => validator("manufacturer", text)}
            />
            <TextInput
              style={{ height: 45, paddingVertical: verticalScale(3) }}
              label="DATE/RECON DATE"
              mode="outlined"
              disabled={isDisabled}
              value={reconDate}
              onChangeText={text => validator("reconDate", text)}
            />
          </Card.Content>
          <Card.Actions>
            <Subheading>{"Fill all fields to"}</Subheading>
            <Button
              style={{ alignSelf: "flex-end" }}
              onPress={() => this.setState({ step: 9 })}
              icon="chevron-right"
            >
              {"Proceed"}
            </Button>
          </Card.Actions>
        </Card>
      </>
    );
  };
  $pressureRegulatorSupplyDetails = () => {
    let {
      check1,
      check2
    } = this.state?.data?.propaneStorageDetails?.pressureRegulatorAndSupplySystemDetails;
    let { isDisabled } = this.state.local;

    let validator = (type, value) => {
      this.setState({
        data: {
          ...this.state?.data,
          propaneStorageDetails: {
            ...this.state?.data?.propaneStorageDetails,
            pressureRegulatorAndSupplySystemDetails: {
              ...this.state?.data?.propaneStorageDetails
                ?.pressureRegulatorAndSupplySystemDetails,
              [type]: value
            }
          }
        }
      });
    };
    return (
      <>
        <Card>
          <Title style={{ alignSelf: "center", marginBottom: 20 }}>
            {"PRESSURE REGULATOR & SUPPLY SYSTEM DETAILS"}
          </Title>
          <Card.Content>
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: scale(1),
                paddingVertical: verticalScale(5)
              }}
            >
              <Subheading style={{ paddingHorizontal: scale(1), fontSize: 17 }}>
                {
                  "VENTING/LOCATION OF REGULATOR INSTALLED IN COMPLIANCE WITH APPLICABLE CODE (CLEARENCES, PROTECTION, ETC.)"
                }
              </Subheading>
              <Switch
                style={{ position: "absolute", right: 0 }}
                value={check1}
                disabled={isDisabled}
                onValueChange={() => validator("check1", !check1)}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: scale(1),
                paddingVertical: verticalScale(5)
              }}
            >
              <Subheading style={{ paddingHorizontal: scale(1), fontSize: 17 }}>
                {
                  "GAS SUPPLY SYSTEM INSTALLED INACCORDANCE \nWITH APPLICABLE CODE (IDENTIFICATION, DIRT \nPOCKETS, BONDING, SHUT OFFS, PRESSURE TAG, \nCONVERSION INFO, PAINTED, PROTECTED, SIZED \nPROPERLY, SUPPORTED, ETC.)"
                }
              </Subheading>
              <Switch
                style={{ position: "absolute", right: 0 }}
                value={check2}
                disabled={isDisabled}
                onValueChange={() => validator("check2", !check2)}
              />
            </View>
          </Card.Content>
          <Card.Actions>
            <Subheading>{"Select all fields to"}</Subheading>
            <Button
              style={{ alignSelf: "flex-end" }}
              onPress={() => this.setState({ step: 10 })}
              icon="chevron-right"
            >
              {"Proceed"}
            </Button>
          </Card.Actions>
        </Card>
      </>
    );
  };
  $regulatorInformation = () => {
    let {
      FST,
      SND,
      LGTWIN,
      SMLTWIN
    } = this.state.data.propaneStorageDetails.regulatorInformation.regulatorType;
    FST = FST === "true" && true || FST === true && true;
    SND = SND === "true" && true || SND === true && true;
    LGTWIN = LGTWIN === "true" && true || LGTWIN === true && true;
    SMLTWIN = SMLTWIN === "true" && true || SMLTWIN === true && true;
    console.log(FST, SND, LGTWIN, SMLTWIN);
    let mainGasLineSize = this.state.data.propaneStorageDetails
      .regulatorInformation.mainGasLineSize;
    let manuf = this.state.data.propaneStorageDetails.regulatorInformation
      .manuf;

    let {
      CYL,
      Regulators
    } = this?.state?.data?.propaneStorageDetails?.clearances;
    let { isDisabled } = this.state.local;

    let regulatorTypeValidator = (type, value) => {
      console.log(this.state.data);
      let val = false
      if(value === "true" || value === true){
        val = true
      }else{
        val = false
      }
      this.setState({
        data: {
          ...this.state.data,
          propaneStorageDetails: {
            ...this.state.data.propaneStorageDetails,
            regulatorInformation: {
              ...this.state.data.propaneStorageDetails.regulatorInformation,
              regulatorType: {
                ...this.state.data.propaneStorageDetails.regulatorInformation
                  .regulatorType,
                [type]: val
              }
            }
          }
        }
      });
    };
    let regulatorInfoValidator = (type, value) => {
      this.setState({
        data: {
          ...this.state.data,
          propaneStorageDetails: {
            ...this.state.data.propaneStorageDetails,
            regulatorInformation: {
              ...this.state.data.propaneStorageDetails.regulatorInformation,
              [type]: value
            }
          }
        }
      });
    };
    let clearancesCYLValidator = (type, value) => {
      this.setState({
        data: {
          ...this.state?.data,
          propaneStorageDetails: {
            ...this.state?.data?.propaneStorageDetails,
            clearances: {
              ...this.state?.data?.propaneStorageDetails?.clearances,
              CYL: {
                ...this.state?.data?.propaneStorageDetails?.clearances?.CYL,
                [type]: {
                  ...this.state?.data?.propaneStorageDetails?.clearances?.CYL[
                    type
                  ],
                  checked: value
                }
              }
            }
          }
        }
      });
    };
    let clearancesRegValidator = (type, value) => {
      this.setState({
        data: {
          ...this.state.data,
          propaneStorageDetails: {
            ...this.state.data.propaneStorageDetails,
            clearances: {
              ...this.state.data.propaneStorageDetails.clearances,
              Regulators: {
                ...this.state.data.propaneStorageDetails.clearances.Regulators,
                [type]: {
                  ...this.state.data.propaneStorageDetails.clearances
                    .Regulators[type],
                  checked: value
                }
              }
            }
          }
        }
      });
    };
    return (
      <>
        <Card>
          <Title style={{ alignSelf: "center", marginBottom: 20 }}>
            {"REGULATOR INFORMATION"}
          </Title>
          <Card.Content>
            <Subheading>{"REGULATOR TYPE"}</Subheading>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: scale(1),
                  paddingVertical: verticalScale(5)
                }}
              >
                <Subheading
                  style={{ paddingHorizontal: scale(1), fontSize: 17 }}
                >
                  {"1 ST"}
                </Subheading>
                <Switch
                  value={FST}
                  disabled={isDisabled}
                  onValueChange={() => regulatorTypeValidator("FST", !FST)}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: scale(1),
                  paddingVertical: verticalScale(5)
                }}
              >
                <Subheading
                  style={{ paddingHorizontal: scale(1), fontSize: 17 }}
                >
                  {"2 ND"}
                </Subheading>
                <Switch
                  value={SND}
                  disabled={isDisabled}
                  onValueChange={() => regulatorTypeValidator("SND", !SND)}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: scale(1),
                  paddingVertical: verticalScale(5)
                }}
              >
                <Subheading
                  style={{ paddingHorizontal: scale(1), fontSize: 17 }}
                >
                  {"LG TWIN"}
                </Subheading>
                <Switch
                  value={LGTWIN}
                  disabled={isDisabled}
                  onValueChange={() =>
                    regulatorTypeValidator("LGTWIN", !LGTWIN)
                  }
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: scale(1),
                  paddingVertical: verticalScale(5)
                }}
              >
                <Subheading
                  style={{ paddingHorizontal: scale(1), fontSize: 17 }}
                >
                  {"SML TWIN"}
                </Subheading>
                <Switch
                  value={SMLTWIN}
                  disabled={isDisabled}
                  onValueChange={() =>
                    regulatorTypeValidator("SMLTWIN", !SMLTWIN)
                  }
                />
              </View>
            </View>
            <TextInput
              style={{ height: 45, paddingVertical: verticalScale(3) }}
              label="MANUFACTURER"
              mode="outlined"
              disabled={isDisabled}
              value={manuf}
              onChangeText={text => regulatorInfoValidator("manuf", text)}
            />
            <TextInput
              style={{ height: 45, paddingVertical: verticalScale(3) }}
              label="MAIN GAS LINE SIZE"
              mode="outlined"
              disabled={isDisabled}
              value={mainGasLineSize}
              onChangeText={text =>
                regulatorInfoValidator("mainGasLineSize", text)
              }
            />
            <Subheading>{"CLEARANCES"}</Subheading>
            <Paragraph>{"CYL/Tanks"}</Paragraph>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: scale(1),
                  paddingVertical: verticalScale(5)
                }}
              >
                <Subheading
                  style={{
                    paddingHorizontal: scale(1),
                    fontSize: 17,
                    marginRight: scale(2)
                  }}
                >
                  {"IGNITION"}
                </Subheading>
                <Switch
                  value={CYL.ignition.checked}
                  disabled={isDisabled}
                  onValueChange={() =>
                    clearancesCYLValidator("ignition", !CYL.ignition.checked)
                  }
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: scale(1),
                  paddingVertical: verticalScale(5)
                }}
              >
                <Subheading
                  style={{
                    paddingHorizontal: scale(1),
                    fontSize: 17,
                    marginRight: scale(2)
                  }}
                >
                  {"BLD OPENINGS"}
                </Subheading>
                <Switch
                  value={CYL.BLD.checked}
                  disabled={isDisabled}
                  onValueChange={() =>
                    clearancesCYLValidator("BLD", !CYL.BLD.checked)
                  }
                />
              </View>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: scale(1),
                  paddingVertical: verticalScale(5)
                }}
              >
                <Subheading
                  style={{
                    paddingHorizontal: scale(1),
                    fontSize: 17,
                    marginRight: scale(2)
                  }}
                >
                  {"COMB. INTAKE"}
                </Subheading>
                <Switch
                  value={CYL.Comb.checked}
                  disabled={isDisabled}
                  onValueChange={() =>
                    clearancesCYLValidator("Comb", !CYL.Comb.checked)
                  }
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: scale(1),
                  paddingVertical: verticalScale(5)
                }}
              >
                <Subheading
                  style={{
                    paddingHorizontal: scale(1),
                    fontSize: 17,
                    marginRight: scale(2)
                  }}
                >
                  {"MECH. INTAKE"}
                </Subheading>
                <Switch
                  value={CYL.Mech.checked}
                  disabled={isDisabled}
                  onValueChange={() =>
                    clearancesCYLValidator("Mech", !CYL.Mech.checked)
                  }
                />
              </View>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: scale(1),
                  paddingVertical: verticalScale(5)
                }}
              >
                <Subheading
                  style={{
                    paddingHorizontal: scale(1),
                    fontSize: 17,
                    marginRight: scale(2)
                  }}
                >
                  {"MOIST. EXHAUST"}
                </Subheading>
                <Switch
                  value={CYL.Moist.checked}
                  disabled={isDisabled}
                  onValueChange={() =>
                    clearancesCYLValidator("Moist", !CYL.Moist.checked)
                  }
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: scale(1),
                  paddingVertical: verticalScale(5)
                }}
              >
                <Subheading
                  style={{
                    paddingHorizontal: scale(1),
                    fontSize: 17,
                    marginRight: scale(2)
                  }}
                >
                  {"HYDRO METERS"}
                </Subheading>
                <Switch
                  value={CYL.Hydro.checked}
                  disabled={isDisabled}
                  onValueChange={() =>
                    clearancesCYLValidator("Hydro", !CYL.Hydro.checked)
                  }
                />
              </View>
            </View>
            <Paragraph>{"REGUATORS"}</Paragraph>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: scale(1),
                  paddingVertical: verticalScale(5)
                }}
              >
                <Subheading
                  style={{
                    paddingHorizontal: scale(1),
                    fontSize: 17,
                    marginRight: scale(2)
                  }}
                >
                  {"IGNITION"}
                </Subheading>
                <Switch
                  value={Regulators.ignition.checked}
                  disabled={isDisabled}
                  onValueChange={() =>
                    clearancesRegValidator(
                      "ignition",
                      !Regulators.ignition.checked
                    )
                  }
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: scale(1),
                  paddingVertical: verticalScale(5)
                }}
              >
                <Subheading
                  style={{
                    paddingHorizontal: scale(1),
                    fontSize: 17,
                    marginRight: scale(2)
                  }}
                >
                  {"BLD OPENINGS"}
                </Subheading>
                <Switch
                  value={Regulators.BLD.checked}
                  disabled={isDisabled}
                  onValueChange={() =>
                    clearancesRegValidator("BLD", !Regulators.BLD.checked)
                  }
                />
              </View>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: scale(1),
                  paddingVertical: verticalScale(5)
                }}
              >
                <Subheading
                  style={{
                    paddingHorizontal: scale(1),
                    fontSize: 17,
                    marginRight: scale(2)
                  }}
                >
                  {"COMB. INTAKE"}
                </Subheading>
                <Switch
                  value={Regulators.Comb.checked}
                  disabled={isDisabled}
                  onValueChange={() =>
                    clearancesRegValidator("Comb", !Regulators.Comb.checked)
                  }
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: scale(1),
                  paddingVertical: verticalScale(5)
                }}
              >
                <Subheading
                  style={{
                    paddingHorizontal: scale(1),
                    fontSize: 17,
                    marginRight: scale(2)
                  }}
                >
                  {"MECH. INTAKE"}
                </Subheading>
                <Switch
                  value={Regulators.Mech.checked}
                  disabled={isDisabled}
                  onValueChange={() =>
                    clearancesRegValidator("Mech", !Regulators.Mech.checked)
                  }
                />
              </View>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: scale(1),
                  paddingVertical: verticalScale(5)
                }}
              >
                <Subheading
                  style={{
                    paddingHorizontal: scale(1),
                    fontSize: 17,
                    marginRight: scale(2)
                  }}
                >
                  {"MOIST. EXHAUST"}
                </Subheading>
                <Switch
                  value={Regulators.Moist.checked}
                  disabled={isDisabled}
                  onValueChange={() =>
                    clearancesRegValidator("Moist", !Regulators.Moist.checked)
                  }
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: scale(1),
                  paddingVertical: verticalScale(5)
                }}
              >
                <Subheading
                  style={{
                    paddingHorizontal: scale(1),
                    fontSize: 17,
                    marginRight: scale(2)
                  }}
                >
                  {"HYDRO METERS"}
                </Subheading>
                <Switch
                  value={Regulators.Hydro.checked}
                  disabled={isDisabled}
                  onValueChange={() =>
                    clearancesRegValidator("Hydro", !Regulators.Hydro.checked)
                  }
                />
              </View>
            </View>
          </Card.Content>
          <Card.Actions>
            <Subheading>{"Select all fields to"}</Subheading>
            <Button
              style={{ alignSelf: "flex-end" }}
              onPress={() => this.setState({ step: 11 })}
              icon="chevron-right"
            >
              {"Proceed"}
            </Button>
          </Card.Actions>
        </Card>
      </>
    );
  };
  $customerReview = () => {
    let { rating, comment } = this?.state?.data?.customer;
    let statusData = this?.state?.data?.status;
    let { isDisabled } = this.state.local;

    let status = [
      { value: "completed" },
      { value: "inpro" },
      { value: "todo" }
    ];
    let validator = (title, value) => {
      this.setState({
        data: {
          ...this.state.data,
          customer: {
            ...this.state.data.customer,
            [title]: value
          }
        }
      });
    };
    let submitTicketNow = () => {
      submitTicket("propane", null, this.state.data)
        .then(res => {
          this.setState({
            step: 12,
            local: {
              ...this.state.local,
              progress: false,
              create_id: res._id,
              create_workId: res.workOrderId
            }
          });
          console.log("Data: ", res);
        })
        .catch(err => {
          console.log("Error: ", err);
        });
    };
    return (
      <>
        <Card>
          <Title style={styles.selfCenter}>{"Customer Review"}</Title>
          <Card.Content>
            <AirbnbRating
              defaultRating={rating}
              isDisabled={isDisabled}
              onFinishRating={val => validator("rating", val)}
              style={{ paddingVertical: 15 }}
            />
            <TextInput
              style={[styles.pressureTagsInput, { height: 100 }]}
              label="Commments"
              multiline
              disabled={isDisabled}
              mode="outlined"
              value={comment}
              onChangeText={text => validator("comment", text)}
            />
            <View style={{ marginVertical: 15 }}>
              <Dropdown
                dropdownOffset={{ top: 0, left: 0, bottom: 32 }}
                value={statusData}
                disabled={isDisabled}
                onChangeText={val =>
                  this.setState({ data: { ...this.state.data, status: val } })
                }
                title="Application Status"
                data={status}
              />
            </View>
          </Card.Content>
          <Card.Actions>
            <Subheading>{"Select all fields to"}</Subheading>
            <Button
              style={{ alignSelf: "flex-end" }}
              onPress={
                isDisabled
                  ? () => {
                      this.setState({ step: 2 });
                      this.props.hideModal();
                    }
                  : () => submitTicketNow()
              }
              icon="chevron-right"
            >
              {isDisabled ? "Done" : "Submit Ticket"}
            </Button>
          </Card.Actions>
        </Card>
      </>
    );
  };
  $submitTicket = () => {
    let submitted = _ => {
      this.setState({
        ...this.defaultState,
        data: { ...this.props.propane.ComprehensivePropaneInspection }
      });
      this.props.hideModal();
    };
    return (
      <>
        <Card>
          <Title style={styles.selfCenter}>{"SUBMITING TICKET"}</Title>
          <Card.Content>
            {this.state.local.progress ? (
              <ActivityIndicator
                color={Colors.green900}
                style={styles.selfWidth100Center}
                size="large"
              />
            ) : (
              <IconButton
                icon="check-circle"
                color={Colors.green900}
                size={60}
                style={styles.selfWidth100Center}
              />
            )}
            {this.state.local.create_workId ? (
              <>
                <View style={styles.submitTicketPanel}>
                  <Paragraph style={{ flex: 1, textAlign: "center" }}>
                    {"Ticket no."}
                  </Paragraph>
                  <Paragraph style={{ flex: 1, textAlign: "left" }}>
                    {this.state.local.create_workId}
                  </Paragraph>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly"
                  }}
                >
                  <Paragraph style={{ flex: 1, textAlign: "center" }}>
                    {"Date & Time "}
                  </Paragraph>
                  <Paragraph style={{ flex: 1, textAlign: "left" }}>
                    {new Date().toDateString()}
                  </Paragraph>
                </View>
              </>
            ) : (
              <View />
            )}
          </Card.Content>
          <Card.Actions>
            <Button
              style={styles.submitTicketDONE}
              icon="check"
              mode="contained"
              onPress={() => submitted()}
              color={Colors.green700}
            >
              {"DONE"}
            </Button>
          </Card.Actions>
        </Card>
      </>
    );
  };
  $pressureTagsExtra = () => {
    let Notes = this.state.data.propaneApplianceDetails.PressureTestTagInfo
      .Notes
      ? this.state.data.propaneApplianceDetails.PressureTestTagInfo.Notes
      : "";
    let techName = this?.state?.local?.empName;
    let signature = this.state.data.propaneApplianceDetails.PressureTestTagInfo
      .signature
      ? this.state.data.propaneApplianceDetails.PressureTestTagInfo.signature
      : "";
    let certNo = this.state.data.propaneApplianceDetails.PressureTestTagInfo
      .certNo
      ? this.state.data.propaneApplianceDetails.PressureTestTagInfo.certNo
      : "";
    let { isDisabled } = this.state.local;

    let validator = (type, value) => {
      this.setState({
        data: {
          ...this.state.data,
          propaneApplianceDetails: {
            ...this.state.data.propaneApplianceDetails,
            PressureTestTagInfo: {
              ...this.state.data.propaneApplianceDetails.PressureTestTagInfo,
              [type]: value
            }
          }
        }
      });
    };
    return (
      <>
        <Card>
          <Title style={styles.selfCenter}>{"PRESSURE TEST TAG INFO"}</Title>
          <Paragraph style={styles.selfCenter}>{"Extra information"}</Paragraph>
          <Card.Content>
            <TextInput
              style={styles.pressureTagsInput}
              label="NOTES"
              multiline
              mode="outlined"
              disabled={isDisabled}
              value={Notes}
              onChangeText={text => validator("Notes", text)}
            />
            <TextInput
              style={styles.pressureTagsInput}
              label="TECHNICIAN NAME"
              disabled
              mode="outlined"
              value={techName}
              onChangeText={text => validator("techName", text)}
            />
            <TextInput
              style={styles.pressureTagsInput}
              label="CERTIFICATION No"
              multiline
              disabled={isDisabled}
              mode="outlined"
              value={certNo}
              onChangeText={text => validator("certNo", text)}
            />
          </Card.Content>
          <Card.Actions>
            <Paragraph>Fill all the fields to</Paragraph>
            <Button
              onPress={() => this.setState({ step: 7 })}
              icon="chevron-right"
            >
              {"Procced"}
            </Button>
          </Card.Actions>
        </Card>
      </>
    );
  };
  $pressureTags = () => {
    let {
      addressOfTest,
      telephoneNo,
      testDate,
      gasTech,
      contractor,
      tssaRegNo,
      testPressure,
      licenseNoAndClass
    } = this.state?.data?.propaneApplianceDetails?.PressureTestTagInfo;
    let { pressure, length, size } = testPressure;
    let { isDisabled } = this.state.local;
    let validator = (type, value) => {
      this.setState({
        data: {
          ...this?.state?.data,
          propaneApplianceDetails: {
            ...this?.state?.data?.propaneApplianceDetails,
            PressureTestTagInfo: {
              ...this?.state?.data?.propaneApplianceDetails
                ?.PressureTestTagInfo,
              [type]: value
            }
          }
        }
      });
    };
    let pressureValidator = (type, value) => {
      this.setState({
        data: {
          ...this?.state?.data,
          propaneApplianceDetails: {
            ...this?.state?.data?.propaneApplianceDetails,
            PressureTestTagInfo: {
              ...this?.state?.data?.propaneApplianceDetails
                ?.PressureTestTagInfo,
              testPressure: {
                ...this?.state?.data?.propaneApplianceDetails
                  ?.PressureTestTagInfo.testPressure,
                [type]: value
              }
            }
          }
        }
      });
    };
    return (
      <>
        <Title style={{ alignSelf: "center" }}>
          {"PRESSURE TEST TAG INFO"}
        </Title>
        <Card>
          <Card.Content>
            <TextInput
              style={{ height: 45, paddingVertical: verticalScale(3) }}
              label="ADDRESS OF TEST"
              mode="outlined"
              disabled={isDisabled}
              value={addressOfTest}
              onChangeText={text => validator("addressOfTest", text)}
            />
            <TextInput
              style={{ height: 45, paddingVertical: verticalScale(3) }}
              label="CONTRACTOR"
              mode="outlined"
              disabled={isDisabled}
              value={contractor}
              onChangeText={text => validator("contractor", text)}
            />
            <TextInput
              style={{ height: 45, paddingVertical: verticalScale(3) }}
              label="TELEPHONE No"
              mode="outlined"
              disabled={isDisabled}
              value={telephoneNo}
              onChangeText={text => validator("telephoneNo", text)}
            />
            <TextInput
              style={{ height: 45, paddingVertical: verticalScale(3) }}
              label="TSSA REG. No"
              mode="outlined"
              disabled={isDisabled}
              value={tssaRegNo}
              onChangeText={text => validator("tssaRegNo", text)}
            />
            <TextInput
              style={{ height: 45, paddingVertical: verticalScale(3) }}
              label="TEST DATE"
              mode="outlined"
              disabled={isDisabled}
              value={testDate}
              onChangeText={text => validator("testDate", text)}
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TextInput
                style={{
                  height: 45,
                  paddingVertical: verticalScale(3),
                  width: "55%"
                }}
                label="TEST PRESSURE"
                mode="outlined"
                disabled={isDisabled}
                value={pressure}
                onChangeText={text => pressureValidator("pressure", text)}
              />
              <TextInput
                style={{
                  height: 45,
                  paddingVertical: verticalScale(3),
                  width: "20%"
                }}
                label="LENGTH"
                mode="outlined"
                disabled={isDisabled}
                value={length}
                onChangeText={text => pressureValidator("length", text)}
              />
              <TextInput
                style={{
                  height: 45,
                  paddingVertical: verticalScale(3),
                  width: "20%"
                }}
                label="SIZE"
                mode="outlined"
                disabled={isDisabled}
                value={size}
                onChangeText={text => pressureValidator("size", text)}
              />
            </View>
            <TextInput
              style={{ height: 45, paddingVertical: verticalScale(3) }}
              label="GAS TECHNICIAN"
              mode="outlined"
              disabled={isDisabled}
              value={gasTech}
              onChangeText={text => validator("gasTech", text)}
            />
            <TextInput
              style={{ height: 45, paddingVertical: verticalScale(3) }}
              label="LICENCE NUMBER & CLASSIFICATION"
              mode="outlined"
              disabled={isDisabled}
              value={licenseNoAndClass}
              onChangeText={text => validator("licenseNoAndClass", text)}
            />
          </Card.Content>
          <Card.Actions>
            <Paragraph>Fill all the fields to</Paragraph>
            <Button
              onPress={() => this.setState({ step: 6 })}
              icon="chevron-right"
            >
              {"Procced"}
            </Button>
          </Card.Actions>
        </Card>
      </>
    );
  };
  _flow = step => {
    switch (step) {
      // case 1:
      //return this.$ticketType();
      case 2:
        return this.$accountNumber();
      case 3:
        return this.$applianceDetails();
      case 4:
        return this.$applianceChecks();
      case 5:
        return this.$pressureTags();
      case 6:
        return this.$pressureTagsExtra();
      case 7:
        return this.$propaneStorageDetails();
      case 8:
        return this.$propaneStorageDetailsExtra();
      case 9:
        return this.$pressureRegulatorSupplyDetails();
      case 10:
        return this.$regulatorInformation();
      case 11:
        return this.$customerReview();
      case 12:
        return this.$submitTicket();
      default:
        this.$loading();
    }
  };
  render() {
    let { props } = this;
    let visible = props.visible ? props.visible : false;
    let _hideModal = props.hideModal ? props.hideModal : () => {};
    return (
      <Portal>
        <Modal dismissable={true} visible={visible} onDismiss={_hideModal}>
          <View style={{ width: "70%", alignSelf: "center" }}>
            <Card>
              <ProgressBar height={20} {...this._progress()} />
              {this._flow(this.state.step)}
            </Card>
          </View>
        </Modal>
      </Portal>
    );
  }
}

const styles = StyleSheet.create({
  modelContainer: {
    justifyContent: "center",
    alignSelf: "center"
  },
  surface: {
    height: 250,
    width: 250,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4
  },
  submitTicketPanel: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  selfCenter: {
    alignSelf: "center"
  },
  selfWidth100Center: {
    width: "100%",
    alignSelf: "center"
  },
  accNumList: {
    height: 150,
    marginVertical: verticalScale(10)
  },
  accNumActionCenter: {
    width: "100%",
    textAlign: "center"
  },
  pressureTagsInput: {
    height: 45,
    paddingVertical: verticalScale(3)
  },
  submitTicketDONE: {
    marginTop: 10,
    width: "100%",
    alignSelf: "center",
    borderRadius: 5
  }
});

function mapStateToProps(state) {
  // console.log(state);
  return {
    propane: state.masterReducer.propane
  };
}

function mapDispatchToProps(dispatch) {
  return {
    accounts: text => dispatch(accountDetails(text))
  };
}

export const PADetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(PADetailsScreen);

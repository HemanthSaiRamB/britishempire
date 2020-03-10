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
  List
} from "react-native-paper";
import { scale, verticalScale, moderateScale } from "../helpers/scaler";
import { Dropdown } from "react-native-material-dropdown";
import { View, StyleSheet, FlatList } from "react-native";
import { connect } from "react-redux";
import _ from "lodash";
import * as oil from "./../assets/strings/oilStrings.json";
import {
  getAccountDtls,
  getApplianceType,
  getManufacturer,
  getModelNo,
  getSerialNo,
  submitTicket,
  getNozzleNo,
  getAllEmployees,
  getFilterSize,
  getCapacity,
  getcurrentLevel,
  getEmpDetails
} from "../redux/Actions/tickets";
import AsyncStorage from "@react-native-community/async-storage";

class OADetailsScreen extends Component {
  defaultState = {
    progress: 0.01,
    step: 1,
    type: 0,
    error: false,
    aField: "accNo",
    // answers
    data: {},
    local: {
      accSearch: [],
      empSearch: [],
      applncType: [],
      manuf: [],
      isDisabled: false,
      airFilterSize: [],
      serialNo: [],
      modelNo: [],
      nozzle: [],
      year: [],
      capacity: [],
      currentLevel: []
    }
  };
  static navigationOptions = {
    header: null
  };
  state = this.defaultState;
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    console.log("OADetails Mounted");
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
  async UNSAFE_componentWillReceiveProps(props, state) {
    console.log("R-Props : ", props, this.state);
    await this.setState({
      data: { ...props.oil.ComprehensiveOilInspection },
      local: {
        ...this.state.local,
        isDisabled:
          props?.oil?.ComprehensiveOilInspection.status == "completed"
            ? true
            : false
      }
    });
    this.state.data.accNo &&
      getAccountDtls(null, this.state.data.accNo)
        .then(res => {
          // console.log("Account details : ", res);
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
        data: { ...this.props.oil.ComprehensiveOilInspection }
      });
    }
  }

  $loading = () => {
    return <ActivityIndicator animating={true} color={Colors.red800} />;
  };
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
    this.state.local.accNo && 
    getAccountDtls(null, this.state.data.accNo)
        .then(res => {
          console.log("Account details now : ", res);
          this.setState({
            local: {
              ...this?.state?.local,
              accName: res[0]?.name,
              accAddr: res[0]?.address
            }
          });
          console.log("acc update", res);
        })
        .catch(err => console.log("acc update err ", err));
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
      submitTicket("oil", null, this.state.data)
        .then(res => {
          this.setState({
            step: 10,
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
        {
          this?.props?.type !== "admin" && (
            <TextInput
                label="Comment"
                mode="outlined"
                multiline
                disabled={true}
                numberOfLines={3}
                value={comment}
              />
          )
        }
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
          { this.state.local.accName && (<View style={{flexDirection:'row',justifyContent:'space-around'}}>
                <Subheading>Name: {this.state.local.accName}</Subheading>
                <Subheading>Address: {this.state.local.accAddr}</Subheading>
          </View>)
          }
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
              {this.props.type === "emp" ? (
                <Button
                  style={{ alignSelf: "flex-end" }}
                  onPress={() => this.setState({ step: 2 })}
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
  $applianceDetails = () => {
    let {
      applncType,
      manuf,
      modelNo,
      serialNo,
      nozzle,
      airFilterSize
    } = this.state.data.oilAppDtls;
    let { isDisabled } = this.state.local;
console.log("applianceType", applncType)
    let { error } = this.state;
    let update = async (type, i, data) => {
      // console.log(JSON.stringify(data));
      let _id = data[i] ? data[i] : "";
      console.log("ID of : ", _id);
      this.setState({
        data: {
          ...this.state.data,
          oilAppDtls: {
            ...this.state.data.oilAppDtls,
            [type]: _id
          }
        }
      });
      let setData = (listType, data) => {
        // console.log(listType, data);
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
      getNozzleNo()
        .then(res => setData("nozzle", res))
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
        this.setState({ step: 3, error: false });
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
                value={!_.isUndefined(applncType.value) ? applncType.value : ""}
                onChangeText={(value, index, data) =>
                  update("applncType", index, data)
                }
                data={this.state.local.applncType}
              />
              <Dropdown
                dropdownOffset={{ top: 0, left: 0 }}
                title="Manufacturer"
                value={!_.isUndefined(manuf.value) ? manuf.value : ""}
                onChangeText={(value, index, data) =>
                  update("manuf", index, data)
                }
                data={this.state.local.manuf}
              />
              <Dropdown
                dropdownOffset={{ top: 0, left: 0 }}
                title="Modal No."
                value={!_.isUndefined(modelNo.value) ? modelNo.value : ""}
                onChangeText={(value, index, data) =>
                  update("modelNo", index, data)
                }
                data={this.state.local.modelNo}
              />
              <Dropdown
                dropdownOffset={{ top: 0, left: 0 }}
                title="Serial No."
                value={!_.isUndefined(serialNo.value) ? serialNo.value : ""}
                onChangeText={(value, index, data) =>
                  update("serialNo", index, data)
                }
                data={this.state.local.serialNo}
              />
              <Dropdown
                dropdownOffset={{ top: 0, left: 0 }}
                title="Nozzle size"
                value={!_.isUndefined(nozzle.value) ? nozzle.value : ""}
                onChangeText={(value, index, data) =>
                  update("nozzle", index, data)
                }
                data={this.state.local.nozzle}
              />
              <Dropdown
                dropdownOffset={{ top: 0, left: 0, bottom: 32 }}
                title="Air Filter Size"
                value={!_.isUndefined(airFilterSize.value) ? airFilterSize.value : ""}
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
  $oilFilter = () => {
    let {
      A30,
      NG3500,
      K10,
      check1,
      check2,
      check3,
      check4,
      check5,
      check6,
      check7,
      check8
    } = this.state.data.oilAppDtls.oilFilter;
    let typeValidator = (type, value) => {
      this.setState({
        data: {
          ...this.state.data,
          oilAppDtls: {
            ...this.state.data.oilAppDtls,
            oilFilter: {
              ...this.state.data.oilAppDtls.oilFilter,
              [type]: value
            }
          }
        }
      });
    };
    Checks = props => {
      let { title, type, value } = props;
      return (
        <View style={styles.ChecksStyles}>
          <Subheading style={{ paddingHorizontal: scale(1), fontSize: 17 }}>
            {title}
          </Subheading>
          <Switch
            value={value}
            onValueChange={() => typeValidator(type, !value)}
          />
        </View>
      );
    };
    CheckPoints = props => {
      let { title, type, value } = props;
      return (
        <View style={styles.ChecksStyles}>
          <Subheading style={{ paddingHorizontal: scale(1), fontSize: 17 }}>
            {title}
          </Subheading>
          <Switch
            style={{ position: "absolute", right: 0 }}
            value={value}
            onValueChange={() => typeValidator(type, !value)}
          />
        </View>
      );
    };

    return (
      <>
        <Title style={{ alignSelf: "center" }}>{"Appliance Details"}</Title>
        <Card>
          <Card.Content
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View style={{ flex: 1 }}>
              <Title>{"Oil Filter"}</Title>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Checks title={"1A30"} type={"A30"} value={A30} />
                <Checks title={"NG3500"} type={"NG3500"} value={NG3500} />
                <Checks title={"K-10"} type={"K10"} value={K10} />
              </View>
              <CheckPoints title={oil.check1} type="check1" value={check1} />
              <CheckPoints title={oil.check2} type="check2" value={check2} />
              <CheckPoints title={oil.check3} type="check3" value={check3} />
              <CheckPoints title={oil.check4} type="check4" value={check4} />
              <CheckPoints title={oil.check5} type="check5" value={check5} />
              <CheckPoints title={oil.check6} type="check6" value={check6} />
              <CheckPoints title={oil.check7} type="check7" value={check7} />
              <CheckPoints title={oil.check8} type="check8" value={check8} />
            </View>
          </Card.Content>
          <Card.Actions>
            <Subheading>Select all fields to</Subheading>
            <Button
              onPress={() => this.setState({ step: 4 })}
              mode="outlined"
              icon="check"
            >
              {"Proceed"}
            </Button>
          </Card.Actions>
        </Card>
      </>
    );
  };
  $combotionAnalysis = () => {
    let {
      Temp,
      CO2,
      O2,
      ExAir,
      Effic,
      Draft,
      CO,
      Smoke
    } = this.state.data.oilAppDtls.combustionAnalysis;
    let {
      check1,
      check2,
      check3,
      check4,
      check5,
      check6,
      check7,
      check8,
      check9,
      check10,
      check11,
      check12,
      check13,
      check14,
      check15,
      check16,
      check17
    } = this.state.data.oilAppDtls.maintainanceCheckList;
    let validator = (type, value) => {
      this.setState({
        data: {
          ...this.state.data,
          oilAppDtls: {
            ...this.state.data.oilAppDtls,
            combustionAnalysis: {
              ...this.state.data.oilAppDtls.combustionAnalysis,
              [type]: value
            }
          }
        }
      });
    };
    let listValidator = (type, value) => {
      this.setState({
        data: {
          ...this.state.data,
          oilAppDtls: {
            ...this.state.data.oilAppDtls,
            maintainanceCheckList: {
              ...this.state.data.oilAppDtls.maintainanceCheckList,
              [type]: value
            }
          }
        }
      });
    };
    Checks = props => {
      let { title, type, value, list } = props;
      return (
        <View style={styles.ChecksStyles}>
          <Subheading style={{ paddingHorizontal: scale(1), fontSize: 17 }}>
            {title}
          </Subheading>
          <Switch
            value={value}
            onValueChange={() =>
              list ? listValidator(type, !value) : validator(type, !value)
            }
          />
        </View>
      );
    };
    CheckList = props => {
      let { title, type, value } = props;
      return (
        <View style={styles.ChecksStyles}>
          <Subheading style={{ paddingHorizontal: scale(1), fontSize: 17 }}>
            {title}
          </Subheading>
          <Switch value={value} onValueChange={() => validator(type, !value)} />
        </View>
      );
    };
    return (
      <>
        <Title style={styles.selfCenter}>{"Combustion Analysis"}</Title>
        <Card>
          <Card.Content
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Checks title={"Temp"} type={"Temp"} value={Temp} />
                <Checks title={"CO2"} type={"CO2"} value={CO2} />
                <Checks title={"O2"} type={"O2"} value={O2} />
                <Checks title={"ExAir"} type={"ExAir"} value={ExAir} />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Checks title={"Effic"} type={"Effic"} value={Effic} />
                <Checks title={"Draft"} type={"Draft"} value={Draft} />
                <Checks title={"CO"} type={"CO"} value={CO} />
                <Checks title={"Smoke"} type={"Smoke"} value={Smoke} />
              </View>
              <Subheading>{"MAINTENANCE CHECKLIST"}</Subheading>
              <Checks
                title={"CHANGE OIL FILTER(S)"}
                type={"check1"}
                value={check1}
                list
              />
              <Checks
                title={"CHANGE NOZZLE/CLEAN ASSEMBLY"}
                type={"check2"}
                value={check2}
                list
              />
              <Checks
                title={"CHECK IGNITION ELECTRODE"}
                type={"check3"}
                value={check3}
                list
              />
              <Checks
                title={"CHECK BLAST TUBE/END CONE"}
                type={"check4"}
                value={check4}
                list
              />
              <Checks
                title={"INSPECT FIREPOT/COMB. CHAMBER"}
                type={"check5"}
                value={check5}
                list
              />
              <Checks
                title={"BURNER COUPLING/BURNER FAN"}
                type={"check6"}
                value={check6}
                list
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Checks
                  title={"ACCESS C/O PORTS"}
                  type={"check7"}
                  value={check7}
                  list
                />
                <Checks
                  title={"REPLACE GASKETS"}
                  type={"check8"}
                  value={check8}
                  list
                />
              </View>
              <Checks
                title={"CHECK/CLEAN VENTING SYSTEM"}
                type={"check9"}
                value={check9}
                list
              />
              <Checks
                title={"FAN/MOTOR/CABINET/BELT/FILTER"}
                type={"check10"}
                value={check10}
                list
              />
              <Checks
                title={"PUMP PRESSURE ____PSI / ____PSI"}
                type={"check11"}
                value={check11}
                list
              />
              <Checks
                title={"LIMITS/SAFETIES OPERATIONAL"}
                type={"check12"}
                value={check12}
                list
              />
              <Checks
                title={"COMBUSTION ANALYSIS"}
                type={"check13"}
                value={check13}
                list
              />
              <Checks
                title={"SMOKE TEST"}
                type={"check14"}
                value={check14}
                list
              />
              <Checks
                title={"LEAK CHECK"}
                type={"check15"}
                value={check15}
                list
              />
              <Checks
                title={"CLEAN UP WORK AREA"}
                type={"check16"}
                value={check16}
                list
              />
              <Checks
                title={"REVIEW WITH CUSTOMER"}
                type={"check17"}
                value={check17}
                list
              />
            </View>
          </Card.Content>
          <Card.Actions>
            <Subheading>Select all fields to</Subheading>
            <Button
              onPress={() => this.setState({ step: 5 })}
              mode="outlined"
              icon="check"
            >
              {"Proceed"}
            </Button>
          </Card.Actions>
        </Card>
      </>
    );
  };
  $pressureTagsExtra = () => {
    let { Notes, signature, certNo } = this.state.data;
    let techName = this?.state?.local?.empName;

    let validator = (type, value) => {
      this.setState({
        data: {
          ...this.state.data,
          [type]: value
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
              mode="outlined"
              value={certNo}
              onChangeText={text => validator("certNo", text)}
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
  $oilStorageDetails = () => {
    let {
      manuf,
      modelNo,
      serialNo,
      year,
      capacity,
      currentLevel
    } = this.state.data.OilStorageDetails;

    let { error } = this.state;
    let update = async (type, i, data) => {
      // console.log(JSON.stringify(data));
      let _id = data[i] ? data[i] : "";
      this.setState({
        data: {
          ...this.state.data,
          OilStorageDetails: {
            ...this.state.data.OilStorageDetails,
            [type]: _id
          }
        }
      });
      let setData = (listType, data) => {
        // console.log(listType, data);
        this.setState({
          ...this.state,
          local: {
            ...this.state.local,
            [listType]: [...data]
          }
        });
      };
      setData("serialNo", []);
      setData("modelNo", []);
      getFilterSize()
        .then(res => setData("airFilterSize", res))
        .catch(err => {
          console.log("Error : ", err);
        });
      getNozzleNo()
        .then(res => setData("nozzle", res))
        .catch(err => {
          console.log("Error : ", err);
        });
      getCapacity()
        .then(res => setData("capacity", res))
        .catch(err => {
          console.log("Error : ", err);
        });
      getcurrentLevel()
        .then(res => setData("currentLevel", res))
        .catch(err => {
          console.log("Error : ", err);
        });
      if (type === "manuf") {
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
      if (!_.isEmpty(manuf) && !_.isEmpty(modelNo) && !_.isEmpty(serialNo)) {
        this.setState({ step: 7, error: false });
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
                title="Manufacturer"
                value={!_.isUndefined(manuf.value) ? manuf.value : ""}
                onChangeText={(value, index, data) =>
                  update("manuf", index, data)
                } 
                data={this.state.local.manuf}
              />
              <Dropdown
                dropdownOffset={{ top: 0, left: 0 }}
                title="Model No"
                value={!_.isUndefined(modelNo.value) ? modelNo.value : ""}
                onChangeText={(value, index, data) =>
                  update("modelNo", index, data)
                }
                data={this.state.local.modelNo}
              />
              <Dropdown
                dropdownOffset={{ top: 0, left: 0 }}
                title="Serial No"
                value={!_.isUndefined(serialNo.value) ? serialNo.value : ""}
                onChangeText={(value, index, data) =>
                  update("serialNo", index, data)
                }
                data={this.state.local.serialNo}
              />
              <Dropdown
                dropdownOffset={{ top: 0, left: 0 }}
                title="Year"
                value={!_.isUndefined(year.value) ? year.value : ""}
                onChangeText={(value, index, data) =>
                  update("year", index, data)
                }
                data={this.state.local.year}
              />
              <Dropdown
                dropdownOffset={{ top: 0, left: 0 }}
                title="Capacity"
                value={!_.isUndefined(capacity.value) ? capacity.value : ""}
                onChangeText={(value, index, data) =>
                  update("capacity", index, data)
                }
                data={this.state.local.capacity}
              />
              <Dropdown
                dropdownOffset={{ top: 0, left: 0, bottom: 32 }}
                title="Current Level"
                value={!_.isUndefined(currentLevel.value) ? currentLevel.value : ""}
                onChangeText={(value, index, data) =>
                  update("currentLevel", index, data)
                }
                data={this.state.local.currentLevel}
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
  $reasonForInspection = () => {
    let {
      newInstallation,
      service_maintenance,
      newCustomer,
      insuranceRequirement
    } = this.state.data.OilStorageDetails.ReasonForInspection;
    let { error } = this.state;
    let { indoor, outdoor } = this.state.data.OilStorageDetails.TankLocation;
    let pageNavigate = () => {
      if (!_.isEmpty(manuf) && !_.isEmpty(modelNo) && !_.isEmpty(serialNo)) {
        this.setState({ step: 7, error: false });
      } else {
        this.setState({ error: true });
      }
    };
    let validator = (type, value) => {
      this.setState({
        data: {
          ...this.state.data,
          OilStorageDetails: {
            ...this.state.data.OilStorageDetails,
            ReasonForInspection: {
              ...this.state.data.OilStorageDetails.ReasonForInspection,
              [type]: value
            }
          }
        }
      });
    };
    let tankValidator = (type, value) => {
      this.setState({
        data: {
          ...this.state.data,
          OilStorageDetails: {
            ...this.state.data.OilStorageDetails,
            TankLocation: {
              ...this.state.data.OilStorageDetails.TankLocation,
              [type]: value
            }
          }
        }
      });
    };
    Checks = props => {
      let { title, type, value, tank } = props;
      return (
        <View style={styles.ChecksStyles}>
          <Subheading style={{ paddingHorizontal: scale(1), fontSize: 17 }}>
            {title}
          </Subheading>
          <Switch
            value={value}
            onValueChange={() => {
              tank ? tankValidator(type, !value) : validator(type, !value);
            }}
          />
        </View>
      );
    };
    return (
      <>
        <Card>
          <Title style={styles.selfCenter}>{"Oil Storage"}</Title>
          <Paragraph style={styles.selfCenter}>
            {"Reason for Inspection"}
          </Paragraph>
          <Card.Content>
            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              <Checks
                title={"New Installation"}
                type={"newInstallation"}
                value={newInstallation}
              />
              <Checks
                title={"Service Maintenance"}
                type={"service_maintenance"}
                value={service_maintenance}
              />
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              <Checks
                title={"New Customer"}
                type={"newCustomer"}
                value={newCustomer}
              />
              <Checks
                title={"Insurance Requirement"}
                type={"insuranceRequirement"}
                value={insuranceRequirement}
              />
            </View>
            <Title>{"Tank Location"}</Title>
            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              <Checks title={"Indoor"} type={"indoor"} value={indoor} tank />
              <Checks title={"Outdoor"} type={"outdoor"} value={outdoor} tank />
            </View>
          </Card.Content>
          <Card.Actions>
            <Paragraph style={{ color: error ? Colors.red900 : Colors.black }}>
              Select All the fields to{" "}
            </Paragraph>
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
  $inspectionChecklist = () => {
    let {
      check1,
      check2,
      check3,
      check4,
      check5,
      check6,
      check7,
      check8,
      check9
    } = this.state.data.OilStorageDetails.InspectionCheckList;
    let { error } = this.state;
    let validator = (type, value) => {
      this.setState({
        data: {
          ...this.state.data,
          OilStorageDetails: {
            ...this.state.data.OilStorageDetails,
            InspectionCheckList: {
              ...this.state.data.OilStorageDetails.InspectionCheckList,
              [type]: value
            }
          }
        }
      });
    };
    return (
      <>
        <Title style={{ alignSelf: "center" }}>{"Appliance Details"}</Title>
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
                  "APPLIANCE APPROVED & INSTALLED IN \nACCORDANCE WITH THE FUEL OIL INSTALLATION \nCODE/MANFACTURERS CERTIFIED INSTRUCTIONS"
                }
              </Subheading>
              <Switch
                style={{ position: "absolute", right: 0 }}
                value={check1}
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
                  'VENT/FILL PROPERLY TERMINATED \n(CLEARENCES TO BUILDING OPENINGS/FUEL \nSTORAGE, VENT 6" HIGHER THAN FILL, \nPAINTED, PROPERLY SLOPED, CAPPED, ETC.)'
                }
              </Subheading>
              <Switch
                style={{ position: "absolute", right: 0 }}
                value={check2}
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
                  "TANK EQUIPPED WITH WHISTLE/FILL \nALARM/OVERFILL PROTECTION DEVICE, LEVEL GAUGE"
                }
              </Subheading>
              <Switch
                style={{ position: "absolute", right: 0 }}
                value={check3}
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
                  "TANK PROPERLY SUPPORTED ON STABLE NON COMBUSTIBLE BASE Legs or Saddles"
                }
              </Subheading>
              <Switch
                style={{ position: "absolute", right: 0 }}
                value={check4}
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
                  "TANK IN SATISFACTORY CONDITION FOR FUEL \nDELIVERY (FREE OF WEEPING/LEAKS, CORROSION, \nDAMAGE, PAINTED, ETC.)"
                }
              </Subheading>
              <Switch
                style={{ position: "absolute", right: 0 }}
                value={check5}
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
                  "OIL LINES INSTALLED INACCORDANCE WITH THE \nFUEL OIL INSTALLATION CODE (PAINTED, PROTECTED, \nFREE OF DEFECTS/DAMAGE, PROPERLY SUPPORTED, \nCOATED/CHASED, NO COMPRESSION FITTINGS, ETC.)"
                }
              </Subheading>
              <Switch
                style={{ position: "absolute", right: 0 }}
                value={check6}
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
                  "APPROVED OIL FILTER INSTALLED (FREE OF \nDAMAGE/CORROSION, NO LEAKS, SHUT OFF \nINSTALLED, ETC.)"
                }
              </Subheading>
              <Switch
                style={{ position: "absolute", right: 0 }}
                value={check7}
                onValueChange={() => validator("check7", !check7)}
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
                  "INDOOR TANK INSTALLED IN ACCORDANCE WITH \nFUEL OIL CODE (2' FROM APPLIANCE BURNER, YELLER \nPAN, ANGLE VALVE COVER, ETC.)"
                }
              </Subheading>
              <Switch
                style={{ position: "absolute", right: 0 }}
                value={check8}
                onValueChange={() => validator("check8", !check8)}
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
                  "OUTDOOR TANK INSTALLED IN ACCORDANCE WITH \nFUEL OIL CODE (FREE OF WATER, ANGLE VALVE \nCOVER, PROTECTED FROM DAMAGE, ETC.)"
                }
              </Subheading>
              <Switch
                style={{ position: "absolute", right: 0 }}
                value={check9}
                onValueChange={() => validator("check9", !check9)}
              />
            </View>
          </Card.Content>
          <Card.Actions>
            <Paragraph style={{ color: error ? Colors.red900 : Colors.black }}>
              Select All the fields to{" "}
            </Paragraph>
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
  $twoTankOilStore = () => {
    let {
      check1,
      check2
    } = this.state.data.OilStorageDetails.TwoTankOilStorage;
    let validator = (type, value) => {
      this.setState({
        data: {
          ...this.state.data,
          OilStorageDetails: {
            ...this.state.data.OilStorageDetails,
            TwoTankOilStorage: {
              ...this.state.data.OilStorageDetails.TwoTankOilStorage,
              [type]: value
            }
          }
        }
      });
    };
    let { error } = this.state;
    let submitTicketNow = () => {
      submitTicket("oil", null, this.state.data)
        .then(res => {
          this.setState({
            step: 10,
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
        <Title style={{ alignSelf: "center" }}>{"Two Tank Oil Storage"}</Title>
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
                  'TANKS JOINED AT BOTTOM WITH 2" \nPIPE - TWO SEPARATE FILL ALARMS & SHUT OFFS, \nCOMMON PAD, ETC.'
                }
              </Subheading>
              <Switch
                style={{ position: "absolute", right: 0 }}
                value={check1}
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
                  'TANKS HAVE SEPARATE FILL & VENT \nINSTALLED IN ACCORDANCE WITH FUEL \nOIL CODE (CLEARENCES TO BUILDING OPENINGS/STORAGE, \nVENT 6" HIGHER THAN FILL, PROPERLY SLOPED, \nPAINTED, CAPPED, ETC.)'
                }
              </Subheading>
              <Switch
                style={{ position: "absolute", right: 0 }}
                value={check2}
                onValueChange={() => validator("check2", !check2)}
              />
            </View>
          </Card.Content>
          <Card.Actions>
            <Paragraph style={{ color: error ? Colors.red900 : Colors.black }}>
              Select All the fields to{" "}
            </Paragraph>
            <Button
              style={{ alignSelf: "flex-end" }}
              onPress={() => submitTicketNow()}
              icon="chevron-right"
            >
              {"Proceed"}
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
        data: { ...this.props.oil.ComprehensiveOilInspection }
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
        return { progress, color: Colors.lightGreen900, indeterminate: true };
      default:
        return { progress, color };
    }
  }
  _flow = step => {
    switch (step) {
      // case 1:
      //return this.$ticketType();
      case 1:
        return this.$accountNumber();
      case 2:
        return this.$applianceDetails();
      case 3:
        return this.$oilFilter();
      case 4:
        return this.$combotionAnalysis();
      case 5:
        return this.$pressureTagsExtra();
      case 6:
        return this.$oilStorageDetails();
      case 7:
        return this.$reasonForInspection();
      case 8:
        return this.$inspectionChecklist();
      case 9:
        return this.$twoTankOilStore();
      case 10:
        return this.$submitTicket();
      //   case 7:
      //     return this.$propaneStorageDetails();
      //   case 8:
      //     return this.$propaneStorageDetailsExtra();
      //   case 9:
      //     return this.$pressureRegulatorSupplyDetails();
      //   case 10:
      //     return this.$regulatorInformation();
      case 11:
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
  modelContainer: { justifyContent: "center", alignSelf: "center" },
  surface: {
    height: 250,
    width: 250,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4
  },
  submitTicketPanel: { flexDirection: "row", justifyContent: "space-evenly" },
  selfCenter: { alignSelf: "center" },
  selfWidth100Center: { width: "100%", alignSelf: "center" },
  accNumList: {
    height: 150,
    marginVertical: verticalScale(10)
  },
  ChecksStyles: {
    flexDirection: "row",
    paddingHorizontal: scale(1),
    paddingVertical: verticalScale(5)
  },
  accNumActionCenter: { width: "100%", textAlign: "center" }
});

function mapStateToProps(state) {
  // console.log(state);
  return {
    oil: state.masterReducer.oil
  };
}

function mapDispatchToProps(dispatch) {
  return {
    accounts: text => dispatch(accountDetails(text))
  };
}

export const OADetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(OADetailsScreen);

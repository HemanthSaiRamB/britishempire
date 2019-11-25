/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
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
  Subheading,
} from 'react-native-paper';
import {scale, verticalScale, moderateScale} from '../helpers/scaler';
import {View, StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';
import {connect} from 'react-redux';
class PADetailsScreen extends Component {
  defaultState = {
    progress: 0.01,
    step: 2,
    type: 0,
    error: false,
    aType: [],
    manu: [],
    airFilter: [],
    serial: [],
    modal: [],
    btu: [],
    // answers
    data: {},
  };
  static navigationOptions = {
    header: null,
  };
  state = this.defaultState;
  constructor(props) {
    super(props);
  }
  UNSAFE_componentWillReceiveProps(props, state) {
    console.log('R-Props : ', props, state);
    this.setState({data: {...props.propane.ComprehensivePropaneInspection}});
  }
  UNSAFE_componentWillUpdate(props, state) {
    console.log('U-Props : ', props, state);
  }
  _progress() {
    let {step} = this.state;
    let progress = step / 11;
    let color = Colors.red100;
    switch (step) {
      case 1:
        return {progress, color: Colors.red100};
      case 2:
        return {progress, color: Colors.red500};
      case 3:
        return {progress, color: Colors.red900};
      case 4:
        return {progress, color: Colors.orange100};
      case 5:
        return {progress, color: Colors.orange500};
      case 6:
        return {progress, color: Colors.orange900};
      case 7:
        return {progress, color: Colors.green100};
      case 8:
        return {progress, color: Colors.green500};
      case 9:
        return {progress, color: Colors.green900};
      case 10:
        return {progress, color: Colors.greenA700};
      case 11:
        return {progress, color: Colors.lightGreen900, indeterminate: true};
      default:
        return {progress, color};
    }
  }
  $accountNumber = () => {
    let {accNo} = this.state.data;
    let accountSearch = input => {
      this.setState({
        data: {
          ...this.state.data,
          accNo: input,
        },
      });
    };
    return (
      <>
        <Card.Title title="Enter Account number" subtitle="Create Ticket" />
        <Card.Content>
          <TextInput
            label="Account Number"
            mode="outlined"
            value={accNo}
            onChangeText={text => accountSearch(text)}
          />
          <View
            style={{
              backgroundColor: Colors.redA100,
              height: 150,
              marginVertical: verticalScale(10),
            }}
          />
        </Card.Content>
        <Card.Actions>
          <Button
            style={{alignSelf: 'flex-end'}}
            onPress={() => this.setState({step: 3})}>
            {'Next'}
          </Button>
          <Button
            style={{
              alignSelf: 'flex-end',
              position: 'absolute',
              right: 10,
              bottom: 10,
            }}
            onPress={() => this.setState({step: 3})}
            mode="outlined"
            icon="check">
            {'Proceed'}
          </Button>
        </Card.Actions>
      </>
    );
  };
  // $ticketType = () => {
  //   return (
  //     <>
  //       <Title style={{alignSelf: 'center'}}>{'Appliance Type'}</Title>
  //       <Card>
  //         <Card.Content
  //           style={{flexDirection: 'row', justifyContent: 'space-around'}}>
  //           <Button
  //             mode="contained"
  //             onPress={() => this.setState({step: 2, type: 1})}
  //             style={{fontSize: 50}}>
  //             Propane
  //           </Button>
  //           <Button
  //             mode="contained"
  //             onPress={() => this.setState({step: 2, type: 2})}
  //             style={{fontSize: 50}}>
  //             Oil
  //           </Button>
  //         </Card.Content>
  //       </Card>
  //     </>
  //   );
  // };
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
      airFilterSize,
      error,
    } = this.state.data.propaneApplianceDetails;
    let update = (type, i, data) => {
      let _id = data[i]._id ? data[i]._id : '';
      this.setState({
        data: {
          ...this.state.data,
          propaneApplianceDetails: {
            ...this.state.data.propaneApplianceDetails,
            [type]: _id,
          },
        },
      });
    };
    let validator = () => {
      if (
        applncType.length >= 3 &&
        manuf.length >= 3 &&
        modelNo.length >= 3 &&
        serialNo.length >= 3
      ) {
        this.setState({step: 4, error: false});
      } else {
        this.setState({error: true});
      }
    };
    return (
      <>
        <Title style={{alignSelf: 'center'}}>{'Appliance Details'}</Title>
        <Card>
          <Card.Content
            style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <View style={{flex: 1}}>
              <Dropdown
                dropdownOffset={{top: 0, left: 0}}
                title="Appliance Type"
                value={applncType ? applncType : ''}
                onChangeText={(value, index, data) =>
                  update('applncType', index, data)
                }
                data={this.state.aType}
              />
              <Dropdown
                dropdownOffset={{top: 0, left: 0}}
                title="Manufacturer"
                value={manuf ? manuf : ''}
                onChangeText={(value, index, data) =>
                  update('manuf', index, data)
                }
                data={this.state.manu}
              />
              <Dropdown
                dropdownOffset={{top: 0, left: 0}}
                title="Modal No."
                value={modelNo ? modelNo : ''}
                onChangeText={(value, index, data) =>
                  update('modelNo', index, data)
                }
                data={this.state.modal}
              />
              <Dropdown
                dropdownOffset={{top: 0, left: 0}}
                title="Serial No."
                value={serialNo ? serialNo : ''}
                onChangeText={(value, index, data) =>
                  update('serialNo', index, data)
                }
                data={this.state.serial}
              />
              <Dropdown
                dropdownOffset={{top: 0, left: 0}}
                title="BTU/H"
                value={BTUH ? BTUH : ''}
                onChangeText={(value, index, data) =>
                  update('BTUH', index, data)
                }
                data={this.state.btu}
              />
              <Dropdown
                dropdownOffset={{top: 0, left: 0, bottom: 32}}
                title="Air Filter Size"
                value={airFilterSize ? airFilterSize : ''}
                onChangeText={(value, index, data) =>
                  update('airFilterSize', index, data)
                }
                data={this.state.airFilter}
              />
            </View>
          </Card.Content>
          <Card.Actions>
            <Paragraph style={{color: error ? Colors.red900 : Colors.black}}>
              Select All the fields to{' '}
            </Paragraph>
            <Button
              style={{alignSelf: 'flex-end'}}
              onPress={() => validator()}
              icon="chevron-right">
              {'Proceed'}
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
      check7,
    } = this.state.data.propaneApplianceDetails.applianceNoCheckList;
    let validator = (type, value) => {
      this.setState({
        data: {
          ...this.state.data,
          propaneApplianceDetails: {
            ...this.state.data.propaneApplianceDetails,
            applianceNoCheckList: {
              ...this.state.data.propaneApplianceDetails.applianceNoCheckList,
              [type]: value,
            },
          },
        },
      });
    };
    return (
      <>
        <Title style={{alignSelf: 'center'}}>
          {'Appliance Condition Checks'}
        </Title>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: scale(1),
                paddingVertical: verticalScale(5),
              }}>
              <Subheading style={{paddingHorizontal: scale(1), fontSize: 17}}>
                {
                  'APPLIANCE APPROVED & INSTALLED IN ACCORDANCE \nWITH THE INSTALLATION CODE/MANUFACTURERS CERTIFIED INSTRUCTIONS'
                }
              </Subheading>
              <Switch
                style={{position: 'absolute', right: 0}}
                value={check1}
                onValueChange={() => validator('check1', !check1)}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: scale(1),
                paddingVertical: verticalScale(5),
              }}>
              <Subheading style={{paddingHorizontal: scale(1), fontSize: 17}}>
                {
                  'APPLIANCE CONVERSION COMPLETED - MANIFOLD \n____ "WC INLET ____ "WC(GAS PRESSURES SET, APPROPRIATE LABELLING AFFIXED TO APPLIANCE, ETC.)'
                }
              </Subheading>
              <Switch
                style={{position: 'absolute', right: 0}}
                value={check2}
                onValueChange={() => validator('check2', !check2)}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: scale(1),
                paddingVertical: verticalScale(5),
              }}>
              <Subheading style={{paddingHorizontal: scale(1), fontSize: 17}}>
                {
                  'VENTING COMPLETE & INSTALLED INACCORDANCE \nWITH INSTALLATION CODE/MAN. CERTIFIED INSTRUCTIONS (CLEARANCES, RUN LENGTH,\n PROPERLY DRAINED, ETC.)'
                }
              </Subheading>
              <Switch
                style={{position: 'absolute', right: 0}}
                value={check3}
                onValueChange={() => validator('check3', !check3)}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: scale(1),
                paddingVertical: verticalScale(5),
              }}>
              <Subheading style={{paddingHorizontal: scale(1), fontSize: 17}}>
                {
                  'INSTALLATION COMPLIANT WITH PROPANE STORAGE \n& HANDLING CODE (CLEARENCES- IGNITION/INTAKE/EXHAUST, ETC.)'
                }
              </Subheading>
              <Switch
                style={{position: 'absolute', right: 0}}
                value={check4}
                onValueChange={() => validator('check4', !check4)}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: scale(1),
                paddingVertical: verticalScale(5),
              }}>
              <Subheading style={{paddingHorizontal: scale(1), fontSize: 17}}>
                {
                  'GAS LINES & PIPING INSTALLED IN ACCORDANCE \nWITH INSTALLATION CODE (IDENTIFIED, BONDED, \nPAINTED, ETC.)'
                }
              </Subheading>
              <Switch
                style={{position: 'absolute', right: 0}}
                value={check5}
                onValueChange={() => validator('check5', !check5)}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: scale(1),
                paddingVertical: verticalScale(5),
              }}>
              <Subheading style={{paddingHorizontal: scale(1), fontSize: 17}}>
                {
                  'APPLIANCE DRAINED/DRAIN LINES (IF \nAPPLICABLE) INSTALLED IN ACCORDANCE WITH MANUFACTURERS CERTIFIED \nINSTRUCTIONS'
                }
              </Subheading>
              <Switch
                style={{position: 'absolute', right: 0}}
                value={check6}
                onValueChange={() => validator('check6', !check6)}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: scale(1),
                paddingVertical: verticalScale(5),
              }}>
              <Subheading style={{paddingHorizontal: scale(1), fontSize: 17}}>
                {
                  'SYSTEM APPROPRIATELY TAGGED WITH A PRESSURE \nTEST TAG AFFIXED TO THE SYSTEM'
                }
              </Subheading>
              <Switch
                style={{position: 'absolute', right: 0}}
                value={check7}
                onValueChange={() => validator('check7', !check7)}
              />
            </View>
          </Card.Content>
          <Card.Actions>
            <Button
              style={{alignSelf: 'flex-end'}}
              onPress={() => this.setState({step: 5})}
              icon="chevron-right">
              {'Proceed'}
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
      check5,
    } = this.state.data.propaneStorageDetails.checkList;

    let validator = (type, value) => {
      this.setState({
        data: {
          ...this.state.data,
          propaneStorageDetails: {
            ...this.state.data.propaneStorageDetails,
            checkList: {
              ...this.state.data.propaneStorageDetails.checkList,
              [type]: value,
            },
          },
        },
      });
    };

    return (
      <>
        <Title style={{alignSelf: 'center'}}>
          {'COMPREHENSIVE PROPANE INSPECTION'}
        </Title>
        <Paragraph style={{alignSelf: 'center'}}>
          {'PROPANE STORAGE DETAILS'}
        </Paragraph>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: scale(1),
                paddingVertical: verticalScale(5),
              }}>
              <Subheading style={{paddingHorizontal: scale(1), fontSize: 17}}>
                {
                  'TANK/CYLINDER OVERALL CONDITION ACCEPTABLE \n(BASE/FOOTING, LEVEL, PROTECTIVE LID, \nGAUGE, ETC.)'
                }
              </Subheading>
              <Switch
                style={{position: 'absolute', right: 0}}
                value={check1}
                onValueChange={() => validator('check1', !check1)}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: scale(1),
                paddingVertical: verticalScale(5),
              }}>
              <Subheading style={{paddingHorizontal: scale(1), fontSize: 17}}>
                {
                  'TANKS/CYLINDER INSTALLED INCOMPLIANCE (CLEARANCES, PROTECTION, ETC.)'
                }
              </Subheading>
              <Switch
                style={{position: 'absolute', right: 0}}
                value={check2}
                onValueChange={() => validator('check2', !check2)}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: scale(1),
                paddingVertical: verticalScale(5),
              }}>
              <Subheading style={{paddingHorizontal: scale(1), fontSize: 17}}>
                {
                  'SERVICE VALVES, RELIEF & FILLER VALVES \nOPERATIONAL/ACCEPTABLE CONDITION (BACKCHECK VALVE ABSENT, ETC.)'
                }
              </Subheading>
              <Switch
                style={{position: 'absolute', right: 0}}
                value={check3}
                onValueChange={() => validator('check3', !check3)}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: scale(1),
                paddingVertical: verticalScale(5),
              }}>
              <Subheading style={{paddingHorizontal: scale(1), fontSize: 17}}>
                {'COMPANY IDENTIFICATION INSTALLED ON \nTANK/CYLINDER'}
              </Subheading>
              <Switch
                style={{position: 'absolute', right: 0}}
                value={check4}
                onValueChange={() => validator('check4', !check4)}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: scale(1),
                paddingVertical: verticalScale(5),
              }}>
              <Subheading style={{paddingHorizontal: scale(1), fontSize: 17}}>
                {
                  'TANK/CYLINDER VALVES, ASSOCIATED REGULATORS \n& CONNECTION MATERIAL FREE OF LEAKS'
                }
              </Subheading>
              <Switch
                style={{position: 'absolute', right: 0}}
                value={check5}
                onValueChange={() => validator('check5', !check5)}
              />
            </View>
          </Card.Content>
          <Card.Actions>
            <Subheading>{'Select all fields to'}</Subheading>
            <Button
              style={{alignSelf: 'flex-end'}}
              onPress={() => this.setState({step: 8})}
              icon="chevron-right">
              {'Proceed'}
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
      reconDate,
    } = this.state.data.propaneStorageDetails;
    let validator = (type, value) => {
      this.setState({
        data: {
          ...this.state.data,
          propaneStorageDetails: {
            ...this.state.data.propaneStorageDetails,
            [type]: value,
          },
        },
      });
    };
    return (
      <>
        <Title style={{alignSelf: 'center'}}>
          {'COMPREHENSIVE PROPANE INSPECTION'}
        </Title>
        <Paragraph style={{alignSelf: 'center'}}>
          {'PROPANE STORAGE Extra DETAILS'}
        </Paragraph>
        <Card>
          <Card.Content>
            <TextInput
              style={{height: 45, paddingVertical: verticalScale(3)}}
              label="SERIAL No"
              mode="outlined"
              value={serialNo}
              onChangeText={text => validator('serialNo', text)}
            />
            <TextInput
              style={{height: 45, paddingVertical: verticalScale(3)}}
              label="CYLINDER"
              mode="outlined"
              value={cylinder}
              onChangeText={text => validator('cylinder', text)}
            />
            <TextInput
              style={{height: 45, paddingVertical: verticalScale(3)}}
              label="TANK"
              mode="outlined"
              value={tank}
              onChangeText={text => validator('tank', text)}
            />
            <TextInput
              style={{height: 45, paddingVertical: verticalScale(3)}}
              label="MANUFACTURER"
              mode="outlined"
              value={manufacturer}
              onChangeText={text => validator('manufacturer', text)}
            />
            <TextInput
              style={{height: 45, paddingVertical: verticalScale(3)}}
              label="DATE/RECON DATE"
              mode="outlined"
              value={reconDate}
              onChangeText={text => validator('reconDate', text)}
            />
          </Card.Content>
          <Card.Actions>
            <Subheading>{'Fill all fields to'}</Subheading>
            <Button
              style={{alignSelf: 'flex-end'}}
              onPress={() => this.setState({step: 9})}
              icon="chevron-right">
              {'Proceed'}
            </Button>
          </Card.Actions>
        </Card>
      </>
    );
  };
  $pressureRegulatorSupplyDetails = () => {
    let {
      check1,
      check2,
    } = this.state.data.propaneStorageDetails.pressureRegulatorAndSupplySystemDetails;
    let validator = (type, value) => {
      this.setState({
        data: {
          ...this.state.data,
          propaneStorageDetails: {
            ...this.state.data.propaneStorageDetails,
            pressureRegulatorAndSupplySystemDetails: {
              ...this.state.data.propaneStorageDetails
                .pressureRegulatorAndSupplySystemDetails,
              [type]: value,
            },
          },
        },
      });
    };
    return (
      <>
        <Card>
          <Title style={{alignSelf: 'center', marginBottom: 20}}>
            {'PRESSURE REGULATOR & SUPPLY SYSTEM DETAILS'}
          </Title>
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: scale(1),
                paddingVertical: verticalScale(5),
              }}>
              <Subheading style={{paddingHorizontal: scale(1), fontSize: 17}}>
                {
                  'VENTING/LOCATION OF REGULATOR INSTALLED IN COMPLIANCE WITH APPLICABLE CODE (CLEARENCES, PROTECTION, ETC.)'
                }
              </Subheading>
              <Switch
                style={{position: 'absolute', right: 0}}
                value={check1}
                onValueChange={() => validator('check1', !check1)}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: scale(1),
                paddingVertical: verticalScale(5),
              }}>
              <Subheading style={{paddingHorizontal: scale(1), fontSize: 17}}>
                {
                  'GAS SUPPLY SYSTEM INSTALLED INACCORDANCE \nWITH APPLICABLE CODE (IDENTIFICATION, DIRT \nPOCKETS, BONDING, SHUT OFFS, PRESSURE TAG, \nCONVERSION INFO, PAINTED, PROTECTED, SIZED \nPROPERLY, SUPPORTED, ETC.)'
                }
              </Subheading>
              <Switch
                style={{position: 'absolute', right: 0}}
                value={check2}
                onValueChange={() => validator('check2', !check2)}
              />
            </View>
          </Card.Content>
          <Card.Actions>
            <Subheading>{'Select all fields to'}</Subheading>
            <Button
              style={{alignSelf: 'flex-end'}}
              onPress={() => this.setState({step: 10})}
              icon="chevron-right">
              {'Proceed'}
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
      SMLTWIN,
    } = this.state.data.propaneStorageDetails.regulatorInformation.regulatorType;
    let {
      mainGasLineSize,
      manuf,
    } = this.state.data.propaneStorageDetails.regulatorInformation;
    let {CYL, Regulators} = this.state.data.propaneStorageDetails.clearances;
    let regulatorTypeValidator = (type, value) => {
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
                [type]: value,
              },
            },
          },
        },
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
              [type]: value,
            },
          },
        },
      });
    };
    let clearancesCYLValidator = (type, value) => {
      this.setState({
        data: {
          ...this.state.data,
          propaneStorageDetails: {
            ...this.state.data.propaneStorageDetails,
            clearances: {
              ...this.state.data.propaneStorageDetails.clearances,
              CYL: {
                ...this.state.data.propaneStorageDetails.clearances.CYL,
                [type]: {
                  ...this.state.data.propaneStorageDetails.clearances.CYL[type],
                  checked: value,
                },
              },
            },
          },
        },
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
                  checked: value,
                },
              },
            },
          },
        },
      });
    };
    return (
      <>
        <Card>
          <Title style={{alignSelf: 'center', marginBottom: 20}}>
            {'REGULATOR INFORMATION'}
          </Title>
          <Card.Content>
            <Subheading>{'REGULATOR TYPE'}</Subheading>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: scale(1),
                  paddingVertical: verticalScale(5),
                }}>
                <Subheading style={{paddingHorizontal: scale(1), fontSize: 17}}>
                  {'1 ST'}
                </Subheading>
                <Switch
                  value={FST}
                  onValueChange={() => regulatorTypeValidator('FST', !FST)}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: scale(1),
                  paddingVertical: verticalScale(5),
                }}>
                <Subheading style={{paddingHorizontal: scale(1), fontSize: 17}}>
                  {'2 ND'}
                </Subheading>
                <Switch
                  value={SND}
                  onValueChange={() => regulatorTypeValidator('SND', !SND)}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: scale(1),
                  paddingVertical: verticalScale(5),
                }}>
                <Subheading style={{paddingHorizontal: scale(1), fontSize: 17}}>
                  {'LG TWIN'}
                </Subheading>
                <Switch
                  value={LGTWIN}
                  onValueChange={() =>
                    regulatorTypeValidator('LGTWIN', !LGTWIN)
                  }
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: scale(1),
                  paddingVertical: verticalScale(5),
                }}>
                <Subheading style={{paddingHorizontal: scale(1), fontSize: 17}}>
                  {'SML TWIN'}
                </Subheading>
                <Switch
                  value={SMLTWIN}
                  onValueChange={() =>
                    regulatorTypeValidator('SMLTWIN', !SMLTWIN)
                  }
                />
              </View>
            </View>
            <TextInput
              style={{height: 45, paddingVertical: verticalScale(3)}}
              label="MANUFACTURER"
              mode="outlined"
              value={manuf}
              onChangeText={text => regulatorInfoValidator('manuf', text)}
            />
            <TextInput
              style={{height: 45, paddingVertical: verticalScale(3)}}
              label="MAIN GAS LINE SIZE"
              mode="outlined"
              value={mainGasLineSize}
              onChangeText={text =>
                regulatorInfoValidator('mainGasLineSize', text)
              }
            />
            <Subheading>{'CLEARANCES'}</Subheading>
            <Paragraph>{'CYL/Tanks'}</Paragraph>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: scale(1),
                  paddingVertical: verticalScale(5),
                }}>
                <Subheading
                  style={{
                    paddingHorizontal: scale(1),
                    fontSize: 17,
                    marginRight: scale(2),
                  }}>
                  {'IGNITION'}
                </Subheading>
                <Switch
                  value={CYL.ignition.checked}
                  onValueChange={() =>
                    clearancesCYLValidator('ignition', !CYL.ignition.checked)
                  }
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: scale(1),
                  paddingVertical: verticalScale(5),
                }}>
                <Subheading
                  style={{
                    paddingHorizontal: scale(1),
                    fontSize: 17,
                    marginRight: scale(2),
                  }}>
                  {'BLD OPENINGS'}
                </Subheading>
                <Switch
                  value={CYL.BLD.checked}
                  onValueChange={() =>
                    clearancesCYLValidator('BLD', !CYL.BLD.checked)
                  }
                />
              </View>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: scale(1),
                  paddingVertical: verticalScale(5),
                }}>
                <Subheading
                  style={{
                    paddingHorizontal: scale(1),
                    fontSize: 17,
                    marginRight: scale(2),
                  }}>
                  {'COMB. INTAKE'}
                </Subheading>
                <Switch
                  value={CYL.Comb.checked}
                  onValueChange={() =>
                    clearancesCYLValidator('Comb', !CYL.Comb.checked)
                  }
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: scale(1),
                  paddingVertical: verticalScale(5),
                }}>
                <Subheading
                  style={{
                    paddingHorizontal: scale(1),
                    fontSize: 17,
                    marginRight: scale(2),
                  }}>
                  {'MECH. INTAKE'}
                </Subheading>
                <Switch
                  value={CYL.Mech.checked}
                  onValueChange={() =>
                    clearancesCYLValidator('Mech', !CYL.Mech.checked)
                  }
                />
              </View>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: scale(1),
                  paddingVertical: verticalScale(5),
                }}>
                <Subheading
                  style={{
                    paddingHorizontal: scale(1),
                    fontSize: 17,
                    marginRight: scale(2),
                  }}>
                  {'MOIST. EXHAUST'}
                </Subheading>
                <Switch
                  value={CYL.Moist.checked}
                  onValueChange={() =>
                    clearancesCYLValidator('Moist', !CYL.Moist.checked)
                  }
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: scale(1),
                  paddingVertical: verticalScale(5),
                }}>
                <Subheading
                  style={{
                    paddingHorizontal: scale(1),
                    fontSize: 17,
                    marginRight: scale(2),
                  }}>
                  {'HYDRO METERS'}
                </Subheading>
                <Switch
                  value={CYL.Hydro.checked}
                  onValueChange={() =>
                    clearancesCYLValidator('Hydro', !CYL.Hydro.checked)
                  }
                />
              </View>
            </View>
            <Paragraph>{'REGUATORS'}</Paragraph>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: scale(1),
                  paddingVertical: verticalScale(5),
                }}>
                <Subheading
                  style={{
                    paddingHorizontal: scale(1),
                    fontSize: 17,
                    marginRight: scale(2),
                  }}>
                  {'IGNITION'}
                </Subheading>
                <Switch
                  value={Regulators.ignition.checked}
                  onValueChange={() =>
                    clearancesRegValidator(
                      'ignition',
                      !Regulators.ignition.checked,
                    )
                  }
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: scale(1),
                  paddingVertical: verticalScale(5),
                }}>
                <Subheading
                  style={{
                    paddingHorizontal: scale(1),
                    fontSize: 17,
                    marginRight: scale(2),
                  }}>
                  {'BLD OPENINGS'}
                </Subheading>
                <Switch
                  value={Regulators.BLD.checked}
                  onValueChange={() =>
                    clearancesRegValidator('BLD', !Regulators.BLD.checked)
                  }
                />
              </View>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: scale(1),
                  paddingVertical: verticalScale(5),
                }}>
                <Subheading
                  style={{
                    paddingHorizontal: scale(1),
                    fontSize: 17,
                    marginRight: scale(2),
                  }}>
                  {'COMB. INTAKE'}
                </Subheading>
                <Switch
                  value={Regulators.Comb.checked}
                  onValueChange={() =>
                    clearancesRegValidator('Comb', !Regulators.Comb.checked)
                  }
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: scale(1),
                  paddingVertical: verticalScale(5),
                }}>
                <Subheading
                  style={{
                    paddingHorizontal: scale(1),
                    fontSize: 17,
                    marginRight: scale(2),
                  }}>
                  {'MECH. INTAKE'}
                </Subheading>
                <Switch
                  value={Regulators.Mech.checked}
                  onValueChange={() =>
                    clearancesRegValidator('Mech', !Regulators.Mech.checked)
                  }
                />
              </View>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: scale(1),
                  paddingVertical: verticalScale(5),
                }}>
                <Subheading
                  style={{
                    paddingHorizontal: scale(1),
                    fontSize: 17,
                    marginRight: scale(2),
                  }}>
                  {'MOIST. EXHAUST'}
                </Subheading>
                <Switch
                  value={Regulators.Moist.checked}
                  onValueChange={() =>
                    clearancesRegValidator('Moist', !Regulators.Moist.checked)
                  }
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: scale(1),
                  paddingVertical: verticalScale(5),
                }}>
                <Subheading
                  style={{
                    paddingHorizontal: scale(1),
                    fontSize: 17,
                    marginRight: scale(2),
                  }}>
                  {'HYDRO METERS'}
                </Subheading>
                <Switch
                  value={Regulators.Hydro.checked}
                  onValueChange={() =>
                    clearancesRegValidator('Hydro', !Regulators.Hydro.checked)
                  }
                />
              </View>
            </View>
          </Card.Content>
          <Card.Actions>
            <Subheading>{'Select all fields to'}</Subheading>
            <Button
              style={{alignSelf: 'flex-end'}}
              onPress={() => this.setState({step: 10})}
              icon="chevron-right">
              {'Submit Ticket'}
            </Button>
          </Card.Actions>
        </Card>
      </>
    );
  };
  $pressureTagsExtra = () => {
    let {
      Notes,
      techName,
      signature,
      certNo,
    } = this.state.data.propaneApplianceDetails.PressureTestTagInfo;
    let validator = (type, value) => {
      this.setState({
        data: {
          ...this.state.data,
          propaneApplianceDetails: {
            ...this.state.data.propaneApplianceDetails,
            PressureTestTagInfo: {
              ...this.state.data.propaneApplianceDetails.PressureTestTagInfo,
              [type]: value,
            },
          },
        },
      });
    };
    return (
      <>
        <Card>
          <Title style={{alignSelf: 'center'}}>
            {'PRESSURE TEST TAG INFO'}
          </Title>
          <Paragraph style={{alignSelf: 'center'}}>
            {'Extra information'}
          </Paragraph>
          <Card.Content>
            <TextInput
              style={{height: 45, paddingVertical: verticalScale(3)}}
              label="NOTES"
              multiline
              mode="outlined"
              value={Notes}
              onChangeText={text => validator('Notes', text)}
            />
            <TextInput
              style={{height: 45, paddingVertical: verticalScale(3)}}
              label="TECHNICIAN NAME"
              multiline
              mode="outlined"
              value={techName}
              onChangeText={text => validator('techName', text)}
            />
            <TextInput
              style={{height: 45, paddingVertical: verticalScale(3)}}
              label="CERTIFICATION No"
              multiline
              mode="outlined"
              value={certNo}
              onChangeText={text => validator('certNo', text)}
            />
          </Card.Content>
          <Card.Actions>
            <Paragraph>Fill all the fields to</Paragraph>
            <Button
              onPress={() => this.setState({step: 7})}
              icon="chevron-right">
              {'Procced'}
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
      licenseNoAndClass,
    } = this.state.data.propaneApplianceDetails.PressureTestTagInfo;
    let {pressure, length, size} = testPressure;
    let validator = (type, value) => {
      this.setState({
        data: {
          ...this.state.data,
          propaneApplianceDetails: {
            ...this.state.data.propaneApplianceDetails,
            PressureTestTagInfo: {
              ...this.state.data.propaneApplianceDetails.PressureTestTagInfo,
              [type]: value,
            },
          },
        },
      });
    };
    let pressureValidator = (type, value) => {
      this.setState({
        data: {
          ...this.state.data,
          propaneApplianceDetails: {
            ...this.state.data.propaneApplianceDetails,
            PressureTestTagInfo: {
              ...this.state.data.propaneApplianceDetails.PressureTestTagInfo,
              testPressure: {
                ...this.state.data.propaneApplianceDetails.PressureTestTagInfo
                  .testPressure,
                [type]: value,
              },
            },
          },
        },
      });
    };
    return (
      <>
        <Title style={{alignSelf: 'center'}}>{'PRESSURE TEST TAG INFO'}</Title>
        <Card>
          <Card.Content>
            <TextInput
              style={{height: 45, paddingVertical: verticalScale(3)}}
              label="ADDRESS OF TEST"
              mode="outlined"
              value={addressOfTest}
              onChangeText={text => validator('addressOfTest', text)}
            />
            <TextInput
              style={{height: 45, paddingVertical: verticalScale(3)}}
              label="CONTRACTOR"
              mode="outlined"
              value={contractor}
              onChangeText={text => validator('contractor', text)}
            />
            <TextInput
              style={{height: 45, paddingVertical: verticalScale(3)}}
              label="TELEPHONE No"
              mode="outlined"
              value={telephoneNo}
              onChangeText={text => validator('telephoneNo', text)}
            />
            <TextInput
              style={{height: 45, paddingVertical: verticalScale(3)}}
              label="TSSA REG. No"
              mode="outlined"
              value={tssaRegNo}
              onChangeText={text => validator('tssaRegNo', text)}
            />
            <TextInput
              style={{height: 45, paddingVertical: verticalScale(3)}}
              label="TEST DATE"
              mode="outlined"
              value={testDate}
              onChangeText={text => validator('testDate', text)}
            />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TextInput
                style={{
                  height: 45,
                  paddingVertical: verticalScale(3),
                  width: '55%',
                }}
                label="TEST PRESSURE"
                mode="outlined"
                value={pressure}
                onChangeText={text => pressureValidator('pressure', text)}
              />
              <TextInput
                style={{
                  height: 45,
                  paddingVertical: verticalScale(3),
                  width: '20%',
                }}
                label="LENGTH"
                mode="outlined"
                value={length}
                onChangeText={text => pressureValidator('length', text)}
              />
              <TextInput
                style={{
                  height: 45,
                  paddingVertical: verticalScale(3),
                  width: '20%',
                }}
                label="SIZE"
                mode="outlined"
                value={size}
                onChangeText={text => pressureValidator('size', text)}
              />
            </View>
            <TextInput
              style={{height: 45, paddingVertical: verticalScale(3)}}
              label="GAS TECHNICIAN"
              mode="outlined"
              value={gasTech}
              onChangeText={text => validator('gasTech', text)}
            />
            <TextInput
              style={{height: 45, paddingVertical: verticalScale(3)}}
              label="LICENCE NUMBER & CLASSIFICATION"
              mode="outlined"
              value={licenseNoAndClass}
              onChangeText={text => validator('licenseNoAndClass', text)}
            />
          </Card.Content>
          <Card.Actions>
            <Paragraph>Fill all the fields to</Paragraph>
            <Button
              onPress={() => this.setState({step: 6})}
              icon="chevron-right">
              {'Procced'}
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
      default:
        this.$loading();
    }
  };
  render() {
    let {props} = this;
    let visible = props.visible ? props.visible : false;
    let _hideModal = props.hideModal ? props.hideModal : () => {};
    return (
      <Portal>
        <Modal dismissable={true} visible={visible} onDismiss={_hideModal}>
          <View style={{width: '70%', alignSelf: 'center'}}>
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
  modelContainer: {justifyContent: 'center', alignSelf: 'center'},
  surface: {
    height: 250,
    width: 250,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
});

function mapStateToProps(state) {
  console.log(state);
  return {
    propane: state.masterReducer.propane,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export const PADetails = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PADetailsScreen);

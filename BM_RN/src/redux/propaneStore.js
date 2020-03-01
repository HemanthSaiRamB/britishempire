export const propane = {
  ComprehensivePropaneInspection: {
    accNo: '',
    workOrderId: '',
    empId: '',
    status: 'todo',
    date: '',
    customer:{
      rating:'',
      comment:''
    },
    priority:0,
    comment:'',
    propaneApplianceDetails: {
      applncType: '',
      manuf: '',
      modelNo: '',
      serialNo: '',
      BTUH: '',
      airFilterSize: '',
      applianceNoCheckList: {
        check1: false,
        check2: false,
        check3: false,
        check4: false,
        check5: false,
        check6: false,
        check7: false,
      },
      PressureTestTagInfo: {
        addressOfTest: '',
        telephoneNo: '',
        testDate: '',
        gasTech: '',
        contractor: '',
        tssaRegNo: '',
        testPressure: {
          pressure: '',
          length: '',
          size: '',
        },
        licenseNoAndClass: '',
        Notes: '',
        techName: '',
        signature: '',
        certNo: '',
      },
    },
    propaneStorageDetails: {
      checkList: {
        check1: false,
        check2: false,
        check3: false,
        check4: false,
        check5: false,
      },
      serialNo: '',
      cylinder: '',
      tank: '',
      manufacturer: '',
      reconDate: '',
      pressureRegulatorAndSupplySystemDetails: {
        check1: false,
        check2: false,
      },
      regulatorInformation: {
        regulatorType: {
          FST: false,
          SND: false,
          LGTWIN: false,
          SMLTWIN: false,
        },
        manuf: '',
        mainGasLineSize: '',
      },
      clearances: {
        CYL: {
          ignition: {
            label: "10'",
            checked: false,
          },
          BLD: {
            label: "3'",
            checked: false,
          },
          Mech: {
            label: "10'",
            checked: false,
          },
          Comb: {
            label: "10'",
            checked: false,
          },
          Moist: {
            label: "3'",
            checked: false,
          },
          Hydro: {
            label: "10'",
            checked: false,
          },
        },
        Regulators: {
          ignition: {
            label: "10'",
            checked: false,
          },
          BLD: {
            label: "3'",
            checked: false,
          },
          Mech: {
            label: "10'",
            checked: false,
          },
          Comb: {
            label: "10'",
            checked: false,
          },
          Moist: {
            label: "3'",
            checked: false,
          },
          Hydro: {
            label: "10'",
            checked: false,
          },
        },
      },
    },
  },
};

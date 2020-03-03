export const propane = {
  ComprehensivePropaneInspection: {
    accNo: "",
    workOrderId: "",
    empId: "",
    createdBy: '',
    status: "todo",
    date: "",
    customer: {
      rating: 3,
      comment: ""
    },
    priority: "Low",
    comment: "",
    propaneApplianceDetails: {
      applncType: {
        id: "",
        value: ""
      },
      manuf: {
        id: "",
        value: ""
      },
      modelNo: {
        id: "",
        value: ""
      },
      serialNo: {
        id: "",
        value: ""
      },
      BTUH: {
        id: "",
        value: ""
      },
      airFilterSize: {
        id: "",
        value: ""
      },
      applianceNoCheckList: {
        check1: false,
        check2: false,
        check3: false,
        check4: false,
        check5: false,
        check6: false,
        check7: false
      },
      PressureTestTagInfo: {
        addressOfTest: "",
        telephoneNo: "",
        testDate: "",
        gasTech: "",
        contractor: "",
        tssaRegNo: "",
        testPressure: {
          pressure: "",
          length: "",
          size: ""
        },
        licenseNoAndClass: "",
        Notes: "",
        techName: "",
        signature: "",
        certNo: ""
      }
    },
    propaneStorageDetails: {
      checkList: {
        check1: false,
        check2: false,
        check3: false,
        check4: false,
        check5: false
      },
      serialNo: "",
      cylinder: "",
      tank: "",
      manufacturer: "",
      reconDate: "",
      pressureRegulatorAndSupplySystemDetails: {
        check1: false,
        check2: false
      },
      regulatorInformation: {
        manuf: "",
        mainGasLineSize: "",
        regulatorType: {
          FST: new Boolean(false),
          SND: false,
          LGTWIN: false,
          SMLTWIN: false
        },
      },
      clearances: {
        CYL: {
          ignition: {
            label: "10'",
            checked: false
          },
          BLD: {
            label: "3'",
            checked: false
          },
          Mech: {
            label: "10'",
            checked: false
          },
          Comb: {
            label: "10'",
            checked: false
          },
          Moist: {
            label: "3'",
            checked: false
          },
          Hydro: {
            label: "10'",
            checked: false
          }
        },
        Regulators: {
          ignition: {
            label: "10'",
            checked: false
          },
          BLD: {
            label: "3'",
            checked: false
          },
          Mech: {
            label: "10'",
            checked: false
          },
          Comb: {
            label: "10'",
            checked: false
          },
          Moist: {
            label: "3'",
            checked: false
          },
          Hydro: {
            label: "10'",
            checked: false
          }
        }
      }
    }
  }
};

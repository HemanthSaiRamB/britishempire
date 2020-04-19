export const oil = {
  ComprehensiveOilInspection: {
    accNo: '',
    workOrderId: '',
    empId: '',
    createdBy: '',
    status: 'todo',
    date: '',
    imageBinary: '',
    customer: {
      rating: 3,
      comment: ""
    },
    priority: "Low",
    comment: "",
    oilAppDtls: {
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
      nozzle: {
        id: "",
        value: ""
      },
      airFilterSize: {
        id: "",
        value: ""
      },
      combustionAnalysis: {
        Temp: false,
        CO2: false,
        O2: false,
        ExAir: false,
        Effic: false,
        Draft: false,
        CO: false,
        Smoke: false,
      },
      oilFilter: {
        A30: false,
        NG3500: false,
        K10: false,
        check1: false,
        check2: false,
        check3: false,
        check4: false,
        check5: false,
        check6: false,
        check7: false,
        check8: false,
      },
      maintainanceCheckList: {
        check1: false,
        check2: false,
        check3: false,
        check4: false,
        check5: false,
        check6: false,
        check7: false,
        check8: false,
        check9: false,
        check10: false,
        check11: false,
        check12: false,
        check13: false,
        check14: false,
        check15: false,
        check16: false,
        check17: false,
      },
    },
    Notes: '',
    techName: '',
    signature: '',
    certNo: '',
    OilStorageDetails: {
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
      year: '',
      capacity: {
        id: "",
        value: ""
      },
      currentLevel: {
        id: "",
        value: ""
      },
      ReasonForInspection: {
        newInstallation: false,
        service_maintenance: false,
        newCustomer: false,
        insuranceRequirement: false,
      },
      TankLocation: {
        indoor: false,
        outdoor: false,
      },
      InspectionCheckList: {
        check1: false,
        check2: false,
        check3: false,
        check4: false,
        check5: false,
        check6: false,
        check7: false,
        check8: false,
        check9: false,
      },
      TwoTankOilStorage: {
        check1: false,
        check2: false,
      },
    },
  },
};

const mongoose = require('mongoose')
const modelName = require('../config/modelname').propane

var d = new Date();


const testPressure = new mongoose.Schema({
    pressure:{
        type:String
    },
    length:{
        type:String
    },
    size:{
        type:String
    },
})
const checkList = new mongoose.Schema({
    check1:{
        type:Boolean,
        default:false
    },
    check2:{
        type:Boolean,
        default:false
     },
     check3:{
        type:Boolean,
        default:false
     },
     check4:{
        type:Boolean,
        default:false
     },
     check5:{
        type:Boolean,
        default:false
     }
})
const pressureRegulatorAndSupplySystemDetails = new mongoose.Schema({
    check1:{
        type:Boolean,
        default:false
    },
    check2:{
        type:Boolean,
        default:false
    }
    
})

const regulatorType = new mongoose.Schema({
    ['FST']:{
        type:String,
        default:false
    },
    ['SND']:{
        type:String,
        default:false
    },
    ['LGTWIN']:{
        type:String,
        default:false
    },
    ['SMLTWIN']:{
        type:String,
        default:false
    }
})
const regulatorInformation= new mongoose.Schema({
    regulatorType:[regulatorType],
    manuf:{
        type:String
    },
    mainGasLineSize:{
        type:String
    }
})
const clearanceArray = new mongoose.Schema({
    ignition:{
        label:{
            type:String,
            default:"10'"
        },
        checked:{
            type:Boolean,
            default:false
        }
    },
    ['BLD']:{
        label:{
            type:String,
            default:"3'"
        },
        checked:{
            type:Boolean,
            default:false
        }
    },
    Mech:{
        label:{
            type:String,
            default:"10'"
        },
        checked:{
            type:Boolean,
            default:false
        }
    },
    Comb:{
        label:{
            type:String,
            default:"10'"
        },
        checked:{
            type:Boolean,
            default:false
        }
    },
    Moist:{
        label:{
            type:String,
            default:"3'"
        },
        checked:{
            type:Boolean,
            default:false
        }
    },
    Hydro:{
        label:{
            type:String,
            default:"10'"
        },
        checked:{
            type:Boolean,
            default:false
        }
    }
})
const clearances = new mongoose.Schema({
    CYL:[clearanceArray],
    Regulators:[clearanceArray]
})

const propaneStorageDetails = new mongoose.Schema({
    checkList:[checkList],
    serialNo:{
        type:String
    },
    cylinder:{
        type:String
    },
    tank:{
        type:String
    },
    manufacturer:{
        type:String
    },
    reconDate:{
        type:String
    },
    
    pressureRegulatorAndSupplySystemDetails:[pressureRegulatorAndSupplySystemDetails],
    regulatorInformation:[regulatorInformation],
    clearances:[clearances]
})



const applianceNoCheckList = new mongoose.Schema({
    check1:{
        type:Boolean,
        default:false
    },
    check2:{
        type:Boolean,
        default:false
    },
    check3:{
        type:Boolean,
        default:false
    },
    check4:{
        type:Boolean,
        default:false
    },
    check5:{
        type:Boolean,
        default:false
    },
    check6:{
        type:Boolean,
        default:false
    },
    check7:{
        type:Boolean,
        default:false
    } 
})
const PressureTestTagInfo = new mongoose.Schema({
    addressOfTest:{
        type:String
    }, 
    telephoneNo:{
        type:String
    }, 
    testDate:{
        type:String
    }, 
    gasTech:{
        type:String
    }, 
    contractor:{
        type:String
    }, 
    tssaRegNo:{
        type:String
    },
    testPressure:[testPressure],
    licenseNoAndClass:{
        type:String
    }, 
    Notes:{
        type:String
    }, 
    techName:{
        type:String
    }, 
    signature:{
        type:String
    }, 
    certNo:{
        type:String
    }, 

})
const propaneApplianceDetails = new mongoose.Schema({
    applncType:{
        type:String,
        required:true
    },  
    manuf:{
        type:String,
        required:true
    },
    modelNo:{
        type:String,
        required:true
    },
    serialNo:{
        type:String,
        required:true
    },
    BTUH:{
        type:String
    },
    airFilterSize:{
        type:String
    },
    applianceNoCheckList:[applianceNoCheckList],
    PressureTestTagInfo:[PressureTestTagInfo]
})




const PropaneSchema = new mongoose.Schema({
    accNo:{
        type:String,
        required:true
    },
    workOrderId:{
        type:String,
        default:""
    },
    date:{
        type:String,
        default:d.getDate()+'-'+d.getMonth()+1+'-'+d.getFullYear()
    },
    empId:{
        type:String
    },
    status:{
        type:String
    },
    propaneApplianceDetails:[propaneApplianceDetails],
    propaneStorageDetails:[propaneStorageDetails]
})

global[modelName] = mongoose.model(modelName,PropaneSchema);

module.exports = global[modelName]
const mongoose = require('mongoose')
const modelName = require('../config/modelname').appliance
const ApplianceType = new mongoose.Schema({
    typeLabel:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

global[modelName] = mongoose.model(modelName,ApplianceType);

module.exports = global[modelName]
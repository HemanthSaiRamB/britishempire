const mongoose = require('mongoose')
const modelName = require('../config/modelname').accountNo
const AccountNoSchema = new mongoose.Schema({
    accountNo:{
        type:String,
        required:true
    },
    customerName:{
        type:String,
        required:true
    },
    customerAddr:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

global[modelName] = mongoose.model(modelName,AccountNoSchema);

module.exports = global[modelName]
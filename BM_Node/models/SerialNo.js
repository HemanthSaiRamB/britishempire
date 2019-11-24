const mongoose = require('mongoose')
const modelName = require('../config/modelname').serialNo
const SerialNo = new mongoose.Schema({
    typeLabel:{
        type:String,
        required:true
    }, modelNoId:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

global[modelName] = mongoose.model(modelName,SerialNo);

module.exports = global[modelName]
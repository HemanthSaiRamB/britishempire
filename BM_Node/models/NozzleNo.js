const mongoose = require('mongoose')
const modelName = require('../config/modelname').nozzleNo
const NozzleNo = new mongoose.Schema({
    typeLabel:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

global[modelName] = mongoose.model(modelName,NozzleNo);

module.exports = global[modelName]
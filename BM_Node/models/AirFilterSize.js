const mongoose = require('mongoose')
const modelName = require('../config/modelname').airFilterSize
const AirFilterSize = new mongoose.Schema({
    typeLabel:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

global[modelName] = mongoose.model(modelName,AirFilterSize);

module.exports = global[modelName]
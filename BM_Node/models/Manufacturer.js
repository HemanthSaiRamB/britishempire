const mongoose = require('mongoose')
const modelName = require('../config/modelname').manufacturer
const Manufacturer = new mongoose.Schema({
    typeLabel:{
        type:String,
        required:true
    }, applncId:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

global[modelName] = mongoose.model(modelName,Manufacturer);

module.exports = global[modelName]
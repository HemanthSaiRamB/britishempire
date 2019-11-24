const mongoose = require('mongoose')
const modelName = require('../config/modelname').capacity
const CapacitySchema = new mongoose.Schema({
    typeLabel:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

global[modelName] = mongoose.model(modelName,CapacitySchema);

module.exports = global[modelName]